import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Req() req) {
    const body = req.body;
    return this.authService.login(body);
  }
}
