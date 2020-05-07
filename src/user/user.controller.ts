import { Body, Controller, Get, Post, Put, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @Get()
  async findAll() {
    return await this.userService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取用户详情' })
  @Get(':id')
  async detail(@Param('id') id: number) {
    const result = await this.userService.findOneById(id)
    console.log(result)
    if (result) {
      return result
    } else {
      return { code: 404, errorMsg: '未找到用户' }
    }
  }

  @ApiOperation({ summary: '创建用户' })
  @Post()
  async createOrLogin(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto)
  }

  @ApiOperation({ summary: '修改用户' })
  @Put(':id')
  async update(@Body() createUserDto: CreateUserDto, @Param('id') id: number) {
    const result = await this.userService.createUser(createUserDto)
    console.log('result', result)
    if (result) {
      return { code: 200, data: result, errorMsg: '' }
    }
    return { code: 404, errorMsg: '未知错误' }
  }

  @ApiOperation({ summary: '删除用户' })
  @Put(':id')
  async remove(@Param('id') id: number) {
    const result = await this.userService.findOneById(id)
    console.log(result)
    if (result) {
      return { success: true }
    }
    return { code: 404, errorMsg: '未知错误' }
  }
}
