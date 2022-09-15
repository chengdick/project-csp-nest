// src/modules/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 校验注册信息
  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查');
    }
    const { mobile } = registerDTO;
    const hasUser = await this.userRepository.findOne({ where: { mobile } });
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }

  // 注册
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO);

    const { nickname, password, mobile } = registerDTO;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPassword(password, salt); // 加密密码

    const newUser: User = new User();
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;
    return await this.userRepository.save(newUser);
  }
}
