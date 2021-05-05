import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user';
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
  async post(@Body() model: User): Promise<void> {
    return await this.userService.add(model);
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() model: User): Promise<void> {
    model.id = id;
    return await this.userService.update(model);
  }

  @Put('activate/:code')
  async activate(@Param('code') code: string): Promise<void> {
    return await this.userService.activateUser(code);
  }

  @Post('/login')
  async login(@Body() model: User): Promise<string> {
    return await this.userService.login(model.email, model.password);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
