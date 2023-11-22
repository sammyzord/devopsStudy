import { Entity, PrimaryGeneratedColumn, Column } from "../deps.ts";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title?: string;

  @Column()
  body: string;
}
