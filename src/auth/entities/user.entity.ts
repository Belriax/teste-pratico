import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column({ type: 'decimal', default: 0, precision: 10, scale: 2 })
  balance: number;
}
