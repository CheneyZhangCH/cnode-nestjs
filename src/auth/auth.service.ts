import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(tel: string, password: string): Promise<any> {
    const user = await this.userService.findOneByTel(tel)
    console.log('validateUser', user)
    if (user && user.length > 0 && user[0].password === password) {
      const { password, ...result } = user[0]
      console.log('result', result)
      return result
    }
    return await this.userService.createUser({ username: tel, password })
  }

  async login(user: any) {
    console.log('auth login', user)
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
