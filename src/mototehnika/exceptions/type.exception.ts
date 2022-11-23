import { HttpException } from '@nestjs/common';

export class TypeNotFoundException extends HttpException{
  constructor() {
    super('не существует такого типа',404);
  }
}
export class TypeExistException extends HttpException{
  constructor() {
    super('не существует такого типа',404);
  }
}