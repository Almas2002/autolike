import { Controller } from '@nestjs/common';
import { BoatService } from './boat.service';

@Controller('boat')
export class BoatController {
  constructor(private boatService:BoatService) {}
}
