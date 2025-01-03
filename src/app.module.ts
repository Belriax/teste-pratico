import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigServices } from './config/postgres.config.service';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigServices,
      inject: [PostgresConfigServices],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    AuthModule,
    TransactionModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
