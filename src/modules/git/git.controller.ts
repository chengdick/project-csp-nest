import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FilesResponse } from './vo/files.vo';
const shell = require('shelljs');
const { resolve } = require('path');
const fs = require('fs-extra');

@ApiTags('git模块')
@Controller('git')
export class GitController {
  @ApiOkResponse({ description: '拉取', type: FilesResponse })
  @Get('files')
  async getFiles() {
    console.log('resolve   : ' + resolve('./web'));
    shell.cd(`${resolve('./web')}`);

    console.log(process.cwd(), 'lll');
    if (
      shell.exec(`git clone https://gitee.com/jaagro/jianan-tools.git `)
        .code !== 0
    ) {
      shell.echo('Error: 执行报错了');
      shell.exit(1);
    }
  }
}
