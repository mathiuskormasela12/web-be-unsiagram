import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginAccountDto {
  @ApiProperty({
    title: 'Email',
    default: 'jhondoe@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ allow_display_name: false }, { message: 'Email is invalid' })
  @IsString({ message: 'Email should be a string' })
  email: string;

  @ApiProperty({
    title: 'Password',
    description:
      'It should contain upper-case letter, lower-case lettter, number and special character',
    minLength: 8,
    default: 'Potato1234!',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword({ minLength: 8 }, { message: 'Password is too weak' })
  @IsString({ message: 'Password should be a string' })
  password: string;
}
