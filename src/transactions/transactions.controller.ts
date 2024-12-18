import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
// @UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('depositar')
  deposit(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.deposit(createTransactionDto);
  }

  @Post('sacar')
  withdraw(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.withdraw(createTransactionDto);
  }

  @Post('transferir')
  transfer(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.transfer(createTransactionDto);
  }
}
