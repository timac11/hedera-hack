import { Injectable } from '@nestjs/common';
import {UsersService} from "./storage/service/user.service";
import {FormService} from "./storage/service/form.service";
import {Form} from "./storage/entity/form.entity";
import {User} from "./storage/entity/user.entity";

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService,
              private readonly formService: FormService) {
  }

  async createForm(userId: number, form: Form): Promise<Form> {
    console.log("user owner id", userId);
    const user: User = await this.usersService.findById(userId);
    console.log("user owner", user);
    form.owner = user;
    return this.formService.save(form);
  }

  async getFormsByUserId(userId: number): Promise<Form[]> {
    const owner: User = await this.usersService.findById(userId);
    return this.formService.formRepository.find({where: {owner}, relations: ["owner", "reviewer"], order: {creationDate: "DESC"}})
  }

  async getReviewsByUserId(userId: number): Promise<Form[]> {
    const reviewer: User = await this.usersService.findById(userId);
    return this.formService.formRepository.find({where: {reviewer}, relations: ["owner", "reviewer"], order: {creationDate: "DESC"}})
  }

  async getOtherUsers(userId: number): Promise<User[]> {
    const users = await this.usersService.userRepository.find();
    return users.filter(user => user.id !== userId);
  }

  async addReviewerByIds(userId: number, formId: number): Promise<Form> {
    const user: User = await this.usersService.findById(userId);
    const form: Form = await this.formService.formRepository.findOne({where: {id: formId}});

    form.reviewer = user;
    return this.formService.save(form);
  }
}
