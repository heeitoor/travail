import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, UserType } from 'src/entities/user';
import { ActivateUser, ChangePassword, CreateUser, LoginUser } from 'src/services/user/models';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    return await this.userService.getById(id);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Post()
  async post(@Body() model: CreateUser): Promise<void> {
    return await this.userService.add(model);
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() model: User): Promise<void> {
    model.id = id;
    return await this.userService.update(model);
  }

  @Put('activate')
  async activate(@Body() model: ActivateUser): Promise<void> {
    return await this.userService.activateUser(model.code);
  }

  @Put('recover')
  async recover(@Body() model: ActivateUser): Promise<void> {
    return await this.userService.recover(model.code);
  }

  @Put('changepass/:id')
  async changePassword(@Param('id') id: number, @Body() model: ChangePassword): Promise<void> {
    return await this.userService.changePassword(id, model.password);
  }

  @Post('/login')
  async login(@Body() model: LoginUser): Promise<string> {
    return await this.userService.login(model.email, model.password);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
