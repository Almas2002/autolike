import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {MessageService} from '../service/message.service';
import {AuthGuard} from '../../auth/guard/auth.guard';
import {CreateMessageDto} from '../dto/create-message.dto';
import {GetMessageQuery} from '../dto/get-messages.dto';
import {RoomService} from '../service/room.service';
import {User} from '../../user/user.entity';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {LeaveRoomDto} from '../dto/leave-room.dto';
import {JoinedRoomService} from '../service/joined-room.service';
import {CreateChatDto} from "../dto/create-chat.dto";
import { UserDecorator } from '../../decorators/user.decorator';

@ApiTags('чат')
@Controller('chat')
export class ChatController {
    constructor(private messageService: MessageService, private roomService: RoomService, private joinedRoomService: JoinedRoomService) {
    }

    @ApiOperation({summary: 'создать сообщение'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('message')
    createMessage(@Body()dto: CreateMessageDto, @UserDecorator('id')id: number) {
        dto = {...dto, userId: id};
        return this.messageService.createMessage(dto);
    }

    @ApiOperation({summary: 'взять сообщение одной комнаты'})
    @Get('message/:roomId')
    getMessages(@Param('roomId')roomId: number, @Query()query: GetMessageQuery) {
        return this.messageService.getAllMessage(roomId, {...query}, query.new);
    }

    @ApiOperation({summary: 'получить чаты'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('room')
    getRooms(@UserDecorator('id')id: number) {
        return this.roomService.getRoomsForUser(id);
    }

    @ApiOperation({summary: 'создать чат'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('room')
    createRoom(@UserDecorator()creator: User, @Body()dto: CreateChatDto) {
        return this.roomService.createRoom(creator, dto);
    }

    @Put('leave-room')
    leaveRoom(@Body()dto: LeaveRoomDto) {
        return this.joinedRoomService.deleteBySocketId(dto.socketId)
    }
}