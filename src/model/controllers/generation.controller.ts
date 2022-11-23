import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GenerationService } from '../service/generation.service';
import { CreateGenerationDto, CreateTransmissionDto } from '../dto/generation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Generation } from '../entities/car/generation.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('поколение')
@Controller('generation')
export class GenerationController {
  constructor(private generationService: GenerationService) {
  }
  @ApiResponse({status:201,schema:{
      oneOf:[
        {
          properties:{
            id:{
              type:'number',
              example:1,
            }
          }
        }
      ]
    }})
  @ApiResponse({status:404,schema:{
      oneOf:[
        {
          properties:{
            status:{
              type:'number',
              example:404,
            },
            message:{
              type:'string',
              example:'такой модель не существует',
            }
          }
        }
      ]
  }})
  @ApiResponse({
    status: 422, schema: {
      oneOf: [
        {
          properties: {
            errors: {
              properties: {
                title: {
                  type: 'array',
                  example: ['title should not be empty',
                    'title must be a string'],
                },
                createFrom: {
                  type: 'array',
                  example: ['createFrom should not be empty',
                    'createFrom must be a number'],
                },
                createTo: {
                  type: 'array',
                  example: ['createTo should not be empty',
                    'createTo must be a number'],
                },
                modelId: {
                  type: 'array',
                  example: ['modelId should not be empty',
                    'modelId must be a number'],
                },
              },
            },
          },
        },
      ],
    },
  })
  @ApiImplicitFile({ name: 'file', description: 'аватар для поколение',required:true})
  @ApiOperation({ summary: 'сознание покаление (админ)' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body()dto: CreateGenerationDto,@UploadedFile('file') file) {
    return this.generationService.create(dto,file);
  }
  @ApiResponse({status:400,schema:{
      oneOf:[
        {
          properties:{
            status:{
              type:'number',
              example:400,
            },
            message:{
              type:'string',
              example:'id моделя не указан в параметрах',
            }
          }
        }
      ]
    }})
  @ApiResponse({status:200,type:[Generation]})
  @ApiOperation({ summary: 'массив поколений по моделям' })
  @Get(':modelId')
  list(@Param('modelId')id: string) {
    return this.generationService.list(+id);
  }
  @Post('transmission')
  async createTransMission(@Body()dto:CreateTransmissionDto){
    return this.generationService.createTransmission(dto)
  }
  @Get('transmission')
  async getLIst(){
    return this.generationService.getList()
  }
}