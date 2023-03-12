import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserCredentialDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
