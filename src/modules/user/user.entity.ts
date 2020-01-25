import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  surname?: string;

  @Column()
  avatarUrl?: string;
}
