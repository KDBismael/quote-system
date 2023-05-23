import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategy';

const jwtConfig = {
  useFactory: async (ConfigService: ConfigService) => ({
    secret: ConfigService.get('JWT_SECRET_KEY'),
    signOptions: { expiresIn: ConfigService.get('JWT_EXP_H') },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy, UserService
],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
