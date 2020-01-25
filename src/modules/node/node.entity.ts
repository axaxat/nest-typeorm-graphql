import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orgNodes')
export class NodeEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ nullable: true })
  parentId?: number;

  @Column('varchar')
  title: string;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  role: string;
}
