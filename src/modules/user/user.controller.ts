// src/modules/user/user.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from './user.service';
import { UserInfoResponse } from './vo/user-info.vo';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoResponse> {
    return this.userService.register(registerDTO);
  }
}
