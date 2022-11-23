import {ApiProperty} from "@nestjs/swagger";

export class CreateChatDto {
    @ApiProperty({example: "1", description: "profile id"})
    profileId: number
    @ApiProperty({example: "1", description: "uid"})
    uuid?: number
    @ApiProperty({example: "publisher || subscriber", description: "role "})
    role:string

}