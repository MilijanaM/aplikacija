import * as Validator from 'class-validator';

export class AddInboxDto {
  inboxId: number;
  @Validator.IsNotEmpty()
  mail: string;
  @Validator.IsNotEmpty()
  name: string;
  @Validator.IsNotEmpty()
  message: string;
}
