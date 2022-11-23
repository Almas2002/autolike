import {ApiProperty} from "@nestjs/swagger";

export class CreateCallDto{
    @ApiProperty({example: "Алмас", description: "имя который звонит дрогому пользователю"})
    firstName:string
    @ApiProperty({example: "1 = видеозвонок 0 = аудиозвонок ", description: "тип звонка"})
    type:number
    @ApiProperty({example: "1", description: "id которому надо позвонить"})
    userId:number
    @ApiProperty({example: "1", description: "id комнаты"})
    roomId:number
}