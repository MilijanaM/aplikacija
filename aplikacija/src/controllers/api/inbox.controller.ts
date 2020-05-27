import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Inbox } from "src/controllers/api/entities/inbox.entity";
import { InboxService } from "src/services/inbox/inbox.service";

@Controller('api/inbox')
@Crud({
    model: {
        type: Inbox
    },
    params: {
        id:{
            field: 'inbox_id',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
           
           
        }
    
    },
    routes: {
        exclude: [
            'updateOneBase',
            'deleteOneBase',
    ],
    }

})
export class InboxController{
    constructor(public service: InboxService){ }

}