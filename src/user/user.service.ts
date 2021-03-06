import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto

    const currentUser = await this.findOneByTel(username)
    if (currentUser && currentUser.length > 0) {
      throw new HttpException('手机号码已经注册使用过', 400)
    }

    const newUser = new UserEntity()
    newUser.password = password
    newUser.username = username
    newUser.tel = username

    return this.userRepository.save(newUser)
  }

  findOneById(id: number) {
    return this.userRepository.findOne(id)
  }

  async findOneByTel(tel: string) {
    // if (registerTelOrEmail.indexOf('@') > -1) {
    //   return await this.userRepository.find({
    //     where: [{ email: registerTelOrEmail }],
    //   });
    // }
    return await this.userRepository.find({
      where: [{ tel }],
    })
  }
}
