import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inbox } from 'src/controllers/api/entities/inbox.entity';

@Injectable()
export class InboxService {
  constructor(
    @InjectRepository(Inbox) private readonly inbox: Repository<Inbox>, // !!!
  ) {}
  async addInbox(mail: string, name: string, message: string): Promise<Inbox> {
    const newInbox: Inbox = new Inbox();
    newInbox.mail = mail;
    newInbox.name = name;
    newInbox.message = message;
    return await this.inbox.save(newInbox);
  }
}
