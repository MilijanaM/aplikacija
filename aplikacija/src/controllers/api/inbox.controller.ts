import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Inbox } from "entities/inbox.entity";
import { InboxService } from "src/services/inbox/inbox.service";

@Controller('api/inbox')
@Crud({
    model: {
        type: Inbox
    },
    params: {
        id:{
            field: 'inboxId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           
           
        }
    }

})
export class InboxController{
    constructor(public service: InboxService){ }

}