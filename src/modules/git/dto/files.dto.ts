// src/modules/user/dto/register.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FilesDTO {
  @ApiProperty({
    description: 'git地址',
    example: 'https://gitee.com/csp-git/web-git.git',
  })
  @IsNotEmpty({ message: 'git地址' })
  readonly url: string;

  @ApiProperty({
    description: '用户名',
    example: 'web-git',
  })
  @IsNotEmpty({ message: '请输入项目名称' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly name: string;
}

export class FilesEditDTO {
  @ApiProperty({
    description: '数据',
    example: `
    () => (
          <div>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="danger">Danger</Button>
              <Button type="link">Link</Button>
          </div>
      )
    `,
  })
  @IsNotEmpty({ message: '输入code' })
  readonly code: string;

  @ApiProperty({
    description: '用户名',
    example: 'web-git',
  })
  @IsNotEmpty({ message: '请输入项目名称' })
  @IsString({ message: '名字必须是 String 类型' })
  readonly name: string;
}
