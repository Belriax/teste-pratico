import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(['depositar', 'sacar', 'transferir'])
  type: 'depositar' | 'sacar' | 'transferir';
}
