import { HttpException } from '@nestjs/common';

export class GenerationNotFoundException extends HttpException{
  constructor() {
    super('такой поколений не сущуствует',404);
  }
}