import { ApiProperty } from '@nestjs/swagger';

export class FileVo {}

export class FileInfoVO {
  @ApiProperty({ type: FileVo })
  info: FileVo;
}

export class FilesResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({
    description: '数据',
    type: () => FileInfoVO,
    example: FileInfoVO,
  })
  data: FileInfoVO;

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string;
}
