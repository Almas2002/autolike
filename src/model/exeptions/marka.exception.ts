import { HttpException } from '@nestjs/common';

export class MarkaExistException extends HttpException{
  constructor() {
    super('такая марка уже существует',400);
  }
}
export class MarkaNotFoundException extends HttpException{
  constructor() {
    super('такой марки не существует',404);
  }
}