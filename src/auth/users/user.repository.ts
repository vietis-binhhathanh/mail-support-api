import { Column, EntityRepository, PrimaryColumn, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from '../dto/auth.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /***
   * hash password
   */
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }


  /***
   * sign up
   */
  async signUp(authDto: AuthDto): Promise<void> {
    const { email, password } = authDto;

    const user = new User();
    user.email = email;
    user.passwordSalt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.passwordSalt);
    user.admin = false;
    // user.fullName = fullName;
    user.status = false;
    user.createdDate = new Date();

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /***
   * user sign in authentication
   */
  async authentication(authDto: AuthDto): Promise<string> {
    const { email, password } = authDto;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user.email;
    } else {
      return null;
    }
  }
}
