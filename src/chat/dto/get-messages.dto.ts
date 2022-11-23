export class GetMessagesDto {
  roomId:number;
}
export class GetMessageQuery{
  limit:number;
  page:number;
  new:boolean;
}