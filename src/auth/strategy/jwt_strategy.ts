import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private User: UserService) {
    super({
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(jwt_payload: { email: string; id: number }): Promise<User> {
    const { email } = jwt_payload;
    return await this.User.find(email);
  }
}
