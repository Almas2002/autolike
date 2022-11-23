import { HttpException } from '@nestjs/common';

export class MototehniceNotFoundException extends HttpException{
  constructor() {
    super('не найдена мототехника',404);
  }
}