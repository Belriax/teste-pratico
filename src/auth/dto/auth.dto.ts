import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Senha ' })
  password: string;
}
