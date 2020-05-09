import { HttpException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(tel: string, password: string): Promise<any> {
    const user = await this.userService.findOneByTel(tel)
    console.log('validateUser', user)
    if (user && user.length > 0 && user[0].password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user[0]
      console.log('result', result)
      return result
    }
    if (user && user.length > 0 && user[0].password !== password) {
      throw new HttpException('密码错误', 400)
    }
    return await this.userService.createUser({ username: tel, password })
  }

  async login(user: any) {
    console.log('auth login', user)
    const payload = { username: user.username, sub: user.id }
    return {
      code: 200,
      data: {
        ...user,
        token: this.jwtService.sign(payload),
      },
    }
  }
}
