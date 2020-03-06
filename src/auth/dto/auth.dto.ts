import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MaxLength(128)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  // @IsString()
  // @MaxLength(320)
  // fullName: string;
}
