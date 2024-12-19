import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { TransactionsService } from 'src/transaction/transaction.service';

@Processor('transactions')
export class TransactionProcessor {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Process()
  async handleTransaction(job: Job) {
    const { dto } = job.data;
    console.log(`Processando transação: ${JSON.stringify(dto)}`);

    try {
      await this.transactionsService.createTransaction(dto);
      console.log('Transação processada com sucesso!');
    } catch (error) {
      console.error('Erro ao processar a transação:', error.message);
    }
  }
}
