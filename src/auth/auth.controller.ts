import { Body, Controller, Post } from '@nestjs/common';
import { authDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('register')
  register(@Body() data: authDto) {
    return this.auth.register(data);
  }
  @Post('login')
  login(@Body() data: authDto) {
    return this.auth.login(data);
  }
}
