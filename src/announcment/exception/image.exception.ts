import { HttpException } from '@nestjs/common';

export class ImageNotFoundException extends HttpException{
  constructor() {
    super('такой фотографий не существует',404);
  }
}