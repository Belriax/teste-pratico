import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { AuthService } from 'src/auth/auth.service';

interface CreateTransactionDto {
  type: 'DEPOSIT' | 'WITHDRAW';
  amount: number;
  userId: number;
}

interface TransferTransactionDto {
  amount: number;
  userId: number;
  targetUserId: number;
}

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly authService: AuthService,
  ) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const { type, amount, userId } = dto;

    if (!type || !['DEPOSIT', 'WITHDRAW'].includes(type)) {
      throw new BadRequestException(
        'Transaction type must be DEPOSIT or WITHDRAW.',
      );
    }
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero.');
    }
    const user = await this.authService.findById(userId);
    if (!user) throw new NotFoundException('User not found.');

    if (type === 'DEPOSIT') {
      user.balance = Number(user.balance) + Number(amount);
    } else if (type === 'WITHDRAW') {
      if (Number(user.balance) < Number(amount)) {
        throw new BadRequestException('Insufficient balance.');
      }
      user.balance = Number(user.balance) - Number(amount);
    }

    await this.authService.updateUserBalance(user.id, user.balance);

    try {
      const transaction = this.transactionRepository.create({
        type,
        amount,
        user,
      });
      return await this.transactionRepository.save(transaction);
    } catch (error) {
      return error;
    }
  }

  async transferTransaction(dto: TransferTransactionDto): Promise<Transaction> {
    const { amount, userId, targetUserId } = dto;

    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero.');
    }
    if (userId === targetUserId) {
      throw new BadRequestException('Cannot transfer to the same user.');
    }

    const user = await this.authService.findById(userId);
    const targetUser = await this.authService.findById(targetUserId);

    if (!user) throw new NotFoundException('User not found.');
    if (!targetUser) throw new NotFoundException('Target user not found.');

    if (Number(user.balance) < Number(amount)) {
      throw new BadRequestException('Insufficient balance for transfer.');
    }

    user.balance = Number(user.balance) - Number(amount);
    targetUser.balance = Number(targetUser.balance) + Number(amount);

    try {
      await this.authService.updateUserBalance(user.id, user.balance);
      await this.authService.updateUserBalance(
        targetUser.id,
        targetUser.balance,
      );

      const transaction = this.transactionRepository.create({
        type: 'TRANSFER',
        amount,
        user,
        targetUser,
      });
      return await this.transactionRepository.save(transaction);
    } catch (error) {
      return error;
    }
  }

  async getTransactionsByUser(userId: number): Promise<Transaction[]> {
    if (!userId) {
      throw new BadRequestException('User ID is required.');
    }

    try {
      return await this.transactionRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'targetUser'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      return error;
    }
  }
}
