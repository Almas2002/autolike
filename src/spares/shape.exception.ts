import { HttpException } from '@nestjs/common';

export class ShapeNotFoundException extends HttpException{
   constructor() {
     super('такой запщасти не существует',404);
   }
}