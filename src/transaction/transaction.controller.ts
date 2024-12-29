import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTransactionDto,
  TransferTransactionDto,
} from './dto/transaction.dto';
import { TransactionsService } from './transaction.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('depositar')
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: 201,
    description: 'Depósito realizado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createDeposit(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Post('sacar')
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: 201,
    description: 'Saque Realizado com sucesso!',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async createWithDraw(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createWithDraw(createTransactionDto);
  }

  @Post('transferir')
  @ApiBody({ type: TransferTransactionDto })
  @ApiResponse({
    status: 201,
    description: 'Transferência realizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  async transfer(@Body() transferTransactionDto: TransferTransactionDto) {
    return this.transactionsService.transferTransaction(transferTransactionDto);
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de transações do usuário.' })
  async getTransactionsByUser(@Param('userId') userId: number) {
    return this.transactionsService.getTransactionsByUser(userId);
  }
}
