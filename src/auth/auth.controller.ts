import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  /***
   * API: POST
   * registration
   * @param authDto
   */
  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
    return this.authService.signUp(authDto);
  }

  /***
   * API: POST
   * Login
   * @param authDto
   */
  @Post('/signin')
  signIn(@Body(ValidationPipe) authDto: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
