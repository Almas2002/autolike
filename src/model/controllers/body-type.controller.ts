import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyService } from '../service/body.service';
import { CreateBodyTypeDto } from '../dto/body-type.dto';
import { BodyType } from '../entities/car/bodyType.entity';
import { CreateTypeMotoDto } from '../dto/type-moto.dto';
import { TypeOfMototechnics } from '../../mototehnika/typeOfMototechnics.entity';

@ApiTags('кузов')
@Controller('body-type')
export class BodyTypeController {
  constructor(private bodyService: BodyService) {
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
              example: 'такой кузов уже существует',
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
              },
            },
          },
        },
      ],
    },
  })
  @Post()
  create(@Body()dto: CreateBodyTypeDto): Promise<{ id: number }> {
    return this.bodyService.create(dto);
  }

  @ApiResponse({ status: 200, type: [BodyType] })
  @Get()
  list(): Promise<BodyType[]> {
    return this.bodyService.list();
  }

  @ApiOperation({ summary: 'создает тип мототехники (админ)' })
  @Post('moto')
  createMotoType(@Body()dto: CreateTypeMotoDto): Promise<{ id: number }> {
    return this.bodyService.createMoto(dto);
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
              example: 408,
            },
            message: {
              type: 'string',
              example: 'такой мото тип уже существует',
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
              },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'получить тип мототехники' })
  @ApiResponse({ status: 200, type: [TypeOfMototechnics] })
  @Post('moto')
  getList(): Promise<TypeOfMototechnics[]> {
    return this.bodyService.getMotoTypesList();
  }
  @ApiOperation({ summary: 'удалить тип машины' })
  @ApiResponse({ status: 200 })
  @Delete("car/:id")
  removeCarType(@Param('id')id:number){
    return this.bodyService.removeTypeMachine(id)
  }
  @ApiOperation({ summary: 'удалить тип матацикла' })
  @ApiResponse({ status: 200 })
  @Delete("moto/:id")
  removeMotoType(@Param('id')id:number){
    return this.bodyService.removeTypeMoto(id)
  }


}