import {ApiProperty} from "@nestjs/swagger";

export class EndCallDto{
    @ApiProperty({example: "Алмас", description: "имя который звонит дрогому пользователю"})
    firstName:string
    @ApiProperty({example: "1", description: "id которому надо позвонить"})
    userId:number
    @ApiProperty({example: "1", description: "id комнаты"})
    roomId:number
}