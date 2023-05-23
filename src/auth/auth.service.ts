import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { authDto } from './dto';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private User: UserService, private jwt: JwtService) {}
  
  async register(data: authDto) {
    let user: User = await this.User.find(data.email);
    if (user) throw new HttpException('You already have an account', 400);
    user = await this.User.create(data);
    const token = await this.jwt.signAsync({ email: user.email, id: user.id });
    return { token, ...user };
  }
  async login(data: authDto) {
    const user: User = await this.User.find(data.email);
    if (!user || user.password !== data.password)
      throw new UnauthorizedException('email or password is invalid');
    const token = await this.jwt.signAsync({ email: user.email, id: user.id });
    return { token, ...user };
  }
}
