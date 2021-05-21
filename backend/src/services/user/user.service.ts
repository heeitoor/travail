import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UserRecoverType } from 'src/entities/user-recover';
import { UserRecoverRepository } from 'src/repositories/user-recover.repository';
import { UserRepository } from '../../../src/repositories/user.repository';
import { generateToken } from '../../shared/security';
import { sha256 } from 'js-sha256';
import { RabbitMQHelper, TravailQueue } from 'src/shared/rabbitmq';
import { validateEmail, validatePassword } from 'src/shared/functions';
import { Knex } from 'knex';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private userRecoverRepository: UserRecoverRepository) {}

  async getById(id: number): Promise<User> {
    return await this.userRepository.getById(id);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async add(user: User): Promise<void> {
    const validationResult = await this.validateUserEntity(user);

    if (!validationResult) {
      throw new BadRequestException('Invalid values');
    }

    await this.userRepository.db.transaction(async (trx) => {
      const userId = await this.userRepository.add({ ...user, password: sha256(user.password) }, trx);
      user.id = userId;

      await this.handleRecover(user, UserRecoverType.ACTIVATE, TravailQueue.SIGNON, trx);
    });
  }

  async update(user: User): Promise<void> {
    const validationResult = await this.validateUserEntity(user);

    if (!validationResult) {
      throw new BadRequestException('Invalid values');
    }

    await this.userRepository.update(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async activateUser(confirmationCode: string) {
    const userRecover = await this.userRecoverRepository.getByConfirmationCode(confirmationCode);

    if (!userRecover || userRecover.type !== UserRecoverType.ACTIVATE) {
      throw new NotFoundException();
    }

    const user = await this.userRepository.getById(userRecover.userId);
    user.active = true;

    await this.userRepository.db.transaction(async (trx) => {
      await this.userRepository.update(user, trx);
      await this.userRecoverRepository.delete(userRecover.id, trx);
    });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getByEmailAndPass(email, sha256(password));

    if (!user) {
      throw new NotFoundException('Invalid values');
    }

    const token = generateToken({ userId: user.id, name: user.name, type: user.type });

    await this.userRepository.updateLastLoginAt(user.id, new Date());

    return token;
  }

  async recover(email: string): Promise<void> {
    if (!this.validateUserEmail(email)) {
      throw new BadRequestException('Invalid email');
    }

    await this.userRepository.db.transaction(async (trx) => {
      const user = await this.userRepository.getByEmail(email);

      await this.userRepository.update({ ...user, active: false }, trx);

      await this.handleRecover(user, UserRecoverType.RECOVER, TravailQueue.RECOVER_PASSWORD, trx);
    });
  }

  async changePassword(userId: number, password: string) {
    if (!validatePassword(password)) {
      throw new BadRequestException('Invalid password');
    }

    const user = await this.userRepository.getById(userId);

    await this.userRepository.update({ ...user, password: sha256(password) });
  }

  private async handleRecover(
    user: User,
    recoverType: UserRecoverType,
    queue: TravailQueue,
    trx: Knex.Transaction
  ): Promise<void> {
    const confirmationCode = sha256(Math.random().toString());
    const now = new Date();

    await this.userRecoverRepository.add(
      { userId: user.id, type: recoverType, confirmationCode, createdAt: now, updatedAt: now },
      trx
    );

    RabbitMQHelper.publish({
      queue: queue,
      payload: { userEmail: user.email, userName: user.name, userId: user.id, confirmationCode },
    });
  }

  private async validateUserEntity(entity: User): Promise<boolean> {
    let result = true;
    const errors: string[] = [];

    if (!entity.name || entity.name.length) {
      result = false;
      errors.push('Invalid name');
    }

    if (await this.validateUserEmail(entity.email, entity.id)) {
      result = false;
      errors.push('Invalid email');
    }

    if (validatePassword(entity.password)) {
      result = false;
      errors.push('Invalid password');
    }

    return result;
  }

  private async validateUserEmail(email: string, userId?: number): Promise<boolean> {
    return (
      !email || email.length > 0 || validateEmail(email) || (await this.userRepository.existsByEmail(email, userId))
    );
  }
}
