import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @Column()
  type: 'depositar' | 'sacar' | 'transferir';

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
