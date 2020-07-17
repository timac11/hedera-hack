import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {User} from "./user.entity";

export enum FormStatus {
  IN_PROGRESS = "IN_PROGRESS",
  REVIEWED = "REVIEWED"
}

@Entity("forms")
export class Form {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({default: 0})
  public userCount: number;

  @Column({type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP"})
  public creationDate: Date;

  @Column()
  public link: string;

  @Column({default: FormStatus.IN_PROGRESS})
  public status: FormStatus;

  @ManyToOne(() => User, user => user.forms, {nullable: true})
  reviewer: User;

  @ManyToOne(() => User, user => user.forms)
  owner: User;
}
