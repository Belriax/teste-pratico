import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ReportScheduler {
  constructor(
    @InjectQueue('transactions') private readonly transactionQueue: Queue,
  ) {}

  @Cron('0 0 * * *')
  async scheduleDailyReport() {
    await this.transactionQueue.add('generateDailyReport');
    console.log('Relatório diário em fila.');
  }
}
