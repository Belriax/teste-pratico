import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('transactions')
export class TransactionProcessor {
  @Process('processTransaction')
  async handleTransaction(job: Job) {
    console.log('Processando transação:', job.data);
    // Adicione a lógica de processamento aqui
  }

  @Process('generateDailyReport')
  async generateDailyReport(job: Job) {
    console.log('Gerando relatório diário:', job.data);
    // Adicione a lógica do relatório aqui
  }
}
