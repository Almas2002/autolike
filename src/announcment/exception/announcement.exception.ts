import { HttpException } from '@nestjs/common';

export class AnnouncementNotFoundException extends HttpException{
  constructor() {
    super('такой обьявлений нету',404)
  }
}