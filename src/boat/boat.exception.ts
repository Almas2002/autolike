import { HttpException, HttpStatus } from '@nestjs/common';

export class BoatNotFoundException extends HttpException{
  constructor() {
    super('такой водный транспарт не найден',404);
  }
}