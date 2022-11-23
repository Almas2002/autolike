import { HttpException } from '@nestjs/common';

export class ProfileNotFoundException extends HttpException{
  constructor() {
    super('не существует такого профиля',404);
  }
}