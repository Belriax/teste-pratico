import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { AuthService } from 'src/auth/auth.service';
import {
  CreateTransactionDto,
  TransferTransactionDto,
} from './dto/transaction.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly authService: AuthService,
  ) {}

  private validateTransactionType(type: string) {
    if (!type || !['DEPOSITO', 'SAQUE', 'TRASNFERIR'].includes(type)) {
      throw new BadRequestException(type);
    }
  }

  private validateTransactionAmount(amount: number): void {
    if (amount <= 0) {
      throw new BadRequestException('O valor deve ser maior que zero');
    }
  }

  private async getUserById(userId: number): Promise<User> {
    const user = await this.authService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  private handleDeposit(amount: number, user: User): void {
    user.balance += amount;
  }

  private handleWithDraw(amount: number, user: User): void {
    if (+user.balance < amount) {
      throw new BadRequestException('Saldo insuficiente');
    }
    user.balance -= amount;
  }

  private async updateUserBalance(user: User): Promise<void> {
    await this.authService.updateUserBalance(user.id, user.balance);
  }

  private async createAndSaveTransaction(
    type: string,
    amount: number,
    user: User,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionRepository.create({
        type,
        amount,
        user,
      });
      return await this.transactionRepository.save(transaction);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar a transação.',
        error,
      );
    }
  }

  async createWithDraw(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { type, amount, userId } = createTransactionDto;

    this.validateTransactionType(type);
    this.validateTransactionAmount(amount);

    const user = await this.getUserById(userId);

    if (type === 'SAQUE') {
      this.handleWithDraw(amount, user);
    } else {
      this.validateTransactionType('O tipo tem que ser SAQUE');
    }

    await this.updateUserBalance(user);

    return await this.createAndSaveTransaction(type, amount, user);
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { type, amount, userId } = createTransactionDto;

    this.validateTransactionType(type);
    this.validateTransactionAmount(amount);

    const user = await this.getUserById(userId);

    if (type === 'DEPOSITO') {
      this.handleDeposit(amount, user);
    } else {
      this.validateTransactionType('O tipo tem que ser DEPOSITO');
    }
    await this.updateUserBalance(user);

    return await this.createAndSaveTransaction(type, amount, user);
  }

  async transferTransaction(
    transferTransactionDto: TransferTransactionDto,
  ): Promise<Transaction> {
    const { amount, userId, targetUserId } = transferTransactionDto;

    if (amount <= 0) {
      throw new BadRequestException(
        'O valor da transação deve ser maior que 0.',
      );
    }
    if (userId === targetUserId) {
      throw new BadRequestException(
        'Não é possível transferir para o mesmo usuário.',
      );
    }

    const user = await this.authService.findById(userId);
    const targetUser = await this.authService.findById(targetUserId);

    if (!user) throw new NotFoundException('Usuário não encontrado.');
    if (!targetUser)
      throw new NotFoundException('Id do usuário não encontrado.');

    if (user.balance < amount) {
      throw new BadRequestException('Saldo insuficiente para transação.');
    }

    user.balance = user.balance - amount;
    targetUser.balance = targetUser.balance + amount;

    try {
      await this.authService.updateUserBalance(user.id, user.balance);
      await this.authService.updateUserBalance(
        targetUser.id,
        targetUser.balance,
      );

      const transaction = this.transactionRepository.create({
        type: 'type',
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
