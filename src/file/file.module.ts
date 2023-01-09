import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './images.entity';

@Module({
  providers:[FileService],
  imports:[TypeOrmModule.forFeature([Images])],
  exports:[FileService]
})
export class FileModule {}