import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { JwtPayloadInterface } from './json-web-token/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /***
   * sign up
   */
  async signUp(authDto: AuthDto): Promise<void> {
    return this.userRepository.signUp(authDto);
  }

  /***
   * sign in
   */
  async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.authentication(authDto);

    console.log(authDto);
    console.log(email);

    if (!email) {
      throw new UnauthorizedException('Username not exists :((');
    }

    const payload: JwtPayloadInterface = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
