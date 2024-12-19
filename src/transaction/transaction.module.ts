// src/transaction/transaction.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transaction.service';
import { AuthModule } from 'src/auth/auth.module';
import { TransactionsController } from './transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]), // Registra o TransactionRepository
    AuthModule, // Importa UserModule para acessar UserService
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService], // Exporta para outros módulos, se necessário
})
export class TransactionModule {}
