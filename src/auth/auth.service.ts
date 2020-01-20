import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(telOrEmail: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByTelOrEmail(telOrEmail);
    console.log('validateUser', user);
    if (user && user.length > 0 && user[0].password === pass) {
      const { password, ...result } = user[0];
      console.log('result', result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('auth login', user);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
