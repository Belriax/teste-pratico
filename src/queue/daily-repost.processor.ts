import { Processor, Process } from '@nestjs/bull';
// import { Job } from 'bull';

@Processor('transactions')
export class DailyReportProcessor {
  @Process('generateDailyreport')
  async handleDailyReport() {
    console.log('Processando relatório de trabalho diário');
  }
}
