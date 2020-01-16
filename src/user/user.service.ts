import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    const { telOrEmail, password } = createUserDto;
    const email = telOrEmail.indexOf('@') > -1 ? telOrEmail : '';
    const tel = telOrEmail.indexOf('@') > -1 ? '' : telOrEmail;

    const emailCheck = await this.userRepository.find({
      where: [{ email }],
    });
    if (emailCheck.length > 0) {
      return { code: 404, errorMsg: '邮箱已经注册' };
    }
    const telCheck = await this.userRepository.find({
      where: [{ tel }],
    });
    if (telCheck.length > 0) {
      return { code: 404, errorMsg: '手机号码已经注册' };
    }
    console.log('emailCheck', emailCheck);
    console.log('telCheck', telCheck);

    const newUser = new UserEntity();
    newUser.username = '';
    newUser.password = password;
    newUser.email = email;
    newUser.avatar = '';
    newUser.tel = tel;

    return this.userRepository.save(newUser);
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }
}
