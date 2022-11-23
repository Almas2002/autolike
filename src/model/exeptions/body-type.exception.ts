import { HttpException } from '@nestjs/common';

export class BodyTypeExistException extends HttpException{
  constructor() {
    super('такой кузов уже существует',400);
  }
}

export class BodyTypeNotFoundException extends HttpException{
  constructor() {
    super('такой кузов не существует',400);
  }
}