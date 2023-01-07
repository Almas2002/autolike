import { InjectRepository } from '@nestjs/typeorm';
import { Generation } from '../entities/car/generation.entity';
import { Repository } from 'typeorm';
import { CreateGenerationDto, CreateTransmissionDto } from '../dto/generation.dto';
import { ModelService } from './model.service';
import { ModelNotFoundException } from '../exeptions/model.exception';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileService } from '../../file/file.service';
import { Transmission } from '../entities/car/transmission.entity';

@Injectable()
export class GenerationService {
  constructor(@InjectRepository(Generation) private generationRepository: Repository<Generation>, private modelService: ModelService,
              private fileService: FileService, @InjectRepository(Transmission) private transmissionRepository: Repository<Transmission>) {
  }

  async create(dto: CreateGenerationDto, file: any): Promise<{ id: number }> {
    const model = await this.modelService.findOne(dto.modelId);
    if (!model) {
      throw new ModelNotFoundException();
    }
    const image = await this.fileService.createFile(file);
    const generation = await this.generationRepository.save({ model, image, ...dto });
    return { id: generation.id };
  }

  async list(modelId: number): Promise<Generation[]> {
    if (!modelId) {
      throw new HttpException('id моделя не указан в параметрах', 400);
    }
    const query = this.generationRepository.createQueryBuilder('generation');
    query.andWhere('generation.modelId = :modelId', { modelId })
      .orderBy('generation.createdFrom', 'DESC');
    return await query.getMany();
  }

  async findOneById(id: number) {
    return this.generationRepository.findOne({ where: { id } });
  }

  async getTransMissionById(id: number) {
    return this.transmissionRepository.findOne({ where: { id } });
  }

  async createTransmission(dto: CreateTransmissionDto): Promise<{ id: number }> {
    const candidate = this.transmissionRepository.findOne({ where: { title: dto.title } });
    if (!candidate) {
      throw new HttpException('такой матор уже существует', HttpStatus.CONFLICT);
    }
    const transmission = await this.transmissionRepository.save({ title: dto.title });
    return { id: transmission.id };
  }

  async getList(): Promise<Transmission[]> {
    return this.transmissionRepository.find();
  }

  async remove(id:number){
    await this.generationRepository.delete({id })
  }

}