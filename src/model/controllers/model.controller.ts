import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ModelService } from '../service/model.service';
import { CreateModelDto, FilterModelListQuery } from '../dto/model.dto';
import { Model } from '../entities/car/model.entity';
import { Marka } from '../entities/car/marka.entity';

@ApiTags('модель')
@Controller('model')
export class ModelController {
  constructor(private modelService: ModelService) {
  }

  @ApiResponse({
    status: 201, schema: {
      oneOf: [
        {
          properties: {
            id: {
              type: 'number',
              example: 1,
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400, schema: {
      oneOf: [
        {
          properties: {
            status: {
              type: 'number',
              example: 400,
            },
            message: {
              type: 'string',
              example: 'такой модель уже существует',
            },
          },
        },
      ],
    },
  })
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
                markId: {
                  type: 'array',
                  example: ['markId should not be empty',
                    'markId must be a number'],
                },
              },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'создать модель (админ)' })
  @Post()
  async create(@Body()dto: CreateModelDto) {
    return this.modelService.create(dto);
  }
  @ApiResponse({status:200,schema:{
      oneOf:[
        {
          properties:{
            count:{
              type:'number',
              example:100,
            },
            data:{
              type:'array',
              example:[{
                id:1,
                title:"Camry"
              }]
            }
          }
        }
      ]
    }})
  @Get()
  list(@Query()query: FilterModelListQuery): Promise<{ data: Model[], count: number }> {
    return this.modelService.list(query);
  }
}