import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FilesDTO, FilesEditDTO } from './dto/files.dto';
import { FilesResponse } from './vo/files.vo';
const shell = require('shelljs');
const { resolve } = require('path');
const fse = require('fs-extra');

@ApiTags('git模块')
@Controller('git')
export class GitController {
  @ApiOkResponse({ description: '拉取', type: FilesResponse })
  @Post('files')
  async getFiles(@Body() filesDTO: FilesDTO) {
    const fileList = fse.readdirSync(resolve('./web'));
    if (fileList.includes(filesDTO.name)) {
      shell.cd(resolve(`./web/${filesDTO.name}`));
      shell.exec(`git pull`);
      shell.cd('../');
    } else {
      shell.cd(resolve(`web`));
      if (shell.exec(`git clone ${filesDTO.url}`).code !== 0) {
        shell.echo('Error: 执行报错了');
        shell.exit(1);
      }
    }
    shell.cd('../');
    console.log('resolve   : ' + resolve());
  }

  @ApiOkResponse({ description: '修改', type: FilesResponse })
  @Post('filesEdit')
  async editFiles(@Body() filesDTO: FilesEditDTO) {
    const fileList = fse.readdirSync(resolve('./web'));
    if (!fileList.includes(filesDTO.name)) {
      throw new NotFoundException('没有当前项目');
    } else {
      shell.cd(resolve(`./web/${filesDTO.name}`));
      shell.exec(`git pull`);
      if (fse.readdirSync('./').includes('index.js')) {
        const file = fse
          .readdirSync('./')
          .filter((item) => item.includes('index'));

        console.log(file);
        fse.outputFileSync(`index_v${file.length}.js`, filesDTO.code);
      } else {
        fse.outputFileSync('index.js', '');
      }
      shell.exec(`git add .`);
      shell.exec(`git commit -m " 代码跟新"`);
      shell.exec(`git push`);
    }

    shell.cd('../../');
  }
}
