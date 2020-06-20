import { Controller, Post, Req, Body } from '@nestjs/common';
import { Inbox } from 'src/controllers/api/entities/inbox.entity';
import { InboxService } from 'src/services/inbox/inbox.service';
import { ApiResponse } from 'src/misc/api.response.class';
import { AddInboxDto } from 'src/dtos/inbox/AddInboxDto';
import { Request } from 'express';

@Controller('api/inbox')
export class InboxController {
  constructor(private inboxService: InboxService) {}

  @Post('add')
  async addInbox(
    @Body() data: AddInboxDto,
    @Req() req: Request,
  ): Promise<Inbox | ApiResponse> {
    const inbox = await this.inboxService.addInbox(
      data.mail,
      data.name,
      data.message,
    );

    if (inbox instanceof ApiResponse) {
      return inbox;
    }
  }
}
