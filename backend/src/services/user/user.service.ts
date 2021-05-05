import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user";
import { UserRecoverType } from "src/entities/user-recover";
import { UserRecoverRepository } from "src/repositories/user-recover.repository";
import { MailService } from "src/shared/mail";
import { UserRepository } from "../../../src/repositories/user.repository";
import { generateToken } from "../../shared/security";
import { sha256 } from "js-sha256";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userRecoverRepository: UserRecoverRepository,
    private mailService: MailService
  ) {}

  async getById(id: number): Promise<User> {
    return await this.userRepository.getById(id);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async add(user: User): Promise<void> {
    const exist = await this.userRepository.existsByEmail(user.email);

    if (exist) {
      throw new Error();
    }

    const userId = await this.userRepository.add({
      ...user,
      password: sha256(user.password),
    });

    const confirmationCode = sha256(userId.toString());

    await this.userRecoverRepository.add({
      userId,
      type: UserRecoverType.ACTIVATE,
      confirmationCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.sendMail(user, confirmationCode);
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async activateUser(confirmationCode: string) {
    const userRecover = await this.userRecoverRepository.getByConfirmationCode(
      confirmationCode
    );

    if (!userRecover || userRecover.type !== UserRecoverType.ACTIVATE) {
      throw new Error();
    }

    const user = await this.userRepository.getById(userRecover.userId);
    user.active = true;

    await this.userRepository.update(user);
    await this.userRecoverRepository.delete(userRecover.id);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.getByEmailAndPass(
      email,
      sha256(password)
    );

    if (!user) {
      throw new Error();
    }

    const token = generateToken({
      userId: user.id,
      name: user.name,
      type: user.type,
    });

    await this.userRepository.updateLastLoginAt(user.id, new Date());

    return token;
  }

  async changePassword(userId: number, password: string) {}

  private async sendMail(user: User, confirmationCode: string): Promise<void> {
    await this.mailService.send({
      to: user.email,
      content: `fazer template ainda <a href="www.ativaruser.com/${confirmationCode}">link</a>`,
      subject: "confirme sua conta",
    });
  }
}
