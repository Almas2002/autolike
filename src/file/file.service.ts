import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './images.entity';
import { Repository } from 'typeorm';

export enum TypeofEntityEnum {
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  SPARE = 'SPARE',
  MOTOTECHNICS = 'MOTOTECHNICS',
  BOAT = 'BOAT',
  BANNER = 'BANNER'
}

@Injectable()
export class FileService {
  constructor(@InjectRepository(Images) private imageRepository: Repository<Images>) {
  }

  private bucket = process.env.DO_SPACE_BUCKET;
  private endpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);
  private s3 = new AWS.S3({
    endpoint: this.endpoint,
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY, accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
  });

  async createFile(file: any): Promise<string> {
    try {
      let fileName = v4();
      const { originalname } = file;
      const format = originalname.split('.');
      fileName = fileName + '.' + format[format.length - 1];
      await this.s3_upload(file.buffer, this.bucket, fileName, file.mimetype)
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }

  async uploadFiles(files: any[], data: any, type: TypeofEntityEnum): Promise<Images> {
    let image;
    let object = {};
    if (type == TypeofEntityEnum.SPARE) {
      object['spare'] = data;
    } else if (type == TypeofEntityEnum.ANNOUNCEMENT) {
      object['car'] = data;
    } else if (type == TypeofEntityEnum.MOTOTECHNICS) {
      object['mototechnics'] = data;
    }
    else if (type == TypeofEntityEnum.BANNER) {
      object['banner'] = data;
    }
    else if (type == TypeofEntityEnum.BOAT) {
      object['boat'] = data;
    }
    for (let i = 0; i < files.length; i++) {
      if (i == 0) {
        image = await this.imageRepository.save({ image: await this.createFile(files[i]), ...object  });

      } else {
        await this.imageRepository.save({ image: await this.createFile(files[i]),...object});
      }
    }

    return image;
  }

  async findOneImage(id: number): Promise<Images> {
    return this.imageRepository.findOne({ where: { id } });
  }
  async createImage(fileName:string){
    return this.imageRepository.save({image:fileName})
  }

  private async s3_upload(file, bucket, name, mimeType) {
    const params = {
      Bucket: bucket,
      Key: `${name}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimeType,
      ContentDisposition: 'inline',
      CreateBucketConfiguration:
        {
          LocationConstraint: 'ap-south-1',
        },
    };
    try {
      await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}