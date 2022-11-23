import { HttpException } from '@nestjs/common';

export class CommentsNotFoundException extends HttpException{
  constructor() {
    super('такого коментарий не существует',404)
  }
}