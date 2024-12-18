import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectQueue('transactions')
    private transactionsQueue: Queue,
  ) {}

  async deposit(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      type: 'depositar',
    });
    await this.transactionRepository.save(transaction);
    await this.transactionsQueue.add('processTransaction', transaction);
    return transaction;
  }

  async withdraw(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      type: 'sacar',
    });
    await this.transactionRepository.save(transaction);
    await this.transactionsQueue.add('processTransaction', transaction);
    return transaction;
  }

  async transfer(createTransactionDto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      type: 'transferir',
    });
    await this.transactionRepository.save(transaction);
    await this.transactionsQueue.add('processTransaction', transaction);
    return transaction;
  }
}
