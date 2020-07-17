import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Form} from "./form.entity";

@Unique(["email"])
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({nullable: true})
  public wallet: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @OneToMany(() => Form, form => form.owner)
  forms: Form[];

  @OneToMany(() => Form, form => form.reviewer)
  formsReviews: Form[];
}
