import { HttpException } from '@nestjs/common';

export class ModelExistException extends HttpException{
  constructor() {
    super('такой модель уже есть',400);
  }
}
export class ModelNotFoundException extends HttpException{
  constructor() {
    super('такой модель не существует',404);
  }
}