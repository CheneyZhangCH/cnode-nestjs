import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({required: true, description: '电话或邮箱', example: '16851817888'})
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({required: true, description: '用户密码', example: 'password12138'})
  readonly password: string;
}

