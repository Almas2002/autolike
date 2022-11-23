import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MarkaService } from '../service/marka.service';
import { CreateModelDto } from '../dto/model.dto';
import { Marka } from '../entities/car/marka.entity';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateMarkaDto, FilterMarkaListQuery } from '../dto/marka.dto';
import { ApiQuery } from '@nestjs/swagger';

@ApiTags("Марка")
@Controller("marka")
export class MarkaController {
  constructor(private markaService: MarkaService) {
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
              example:'такая марка уже существует',
            }
          }
        }
      ]
    }})
  @ApiResponse({status:422,schema:{
      oneOf:[
        {
          properties:{
            errors:{
              properties:{
                title:{
                  type:'array',
                  example:[ "title should not be empty",
                    "title must be a string"]
                }
              }
            },
          }
        }
      ]
    }})
  @ApiOperation({summary:"создать марку машины"})
  @Post()
  create(@Body()dto: CreateMarkaDto):Promise<{id:number}> {
    return this.markaService.create(dto);
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
              items: { $ref: getSchemaPath(Marka) },
              example:[{
                id:1,
                title:"Toyota"
              }]
            }
          }
        }
      ]
    }})
  @ApiQuery({example:10,name:"limit",required:false})
  @ApiQuery({example:1,name:"page",required:false})
  @ApiQuery({example:'Toyota',name:"title",required:false})
  @ApiOperation({summary:"взять лист марок"})
  @Get()
  list(@Query()query:FilterMarkaListQuery):Promise<{data:Marka [],count:number}> {
    return this.markaService.list(query);
  }
}