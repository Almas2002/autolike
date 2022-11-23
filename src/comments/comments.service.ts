import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, FilterCommentsQuery } from './comment.dto';
import { ProfileService } from '../profile/profile.service';
import { CommentsNotFoundException } from './comments.exception';
import { ProfileNotFoundException } from '../profile/profile.exception';
import { TypeofEntityEnum } from '../file/file.service';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comments) private commentsRepository: Repository<Comments>, private profileService: ProfileService) {
  }

  async createComment(dto: CreateCommentDto, userId: number): Promise<{ id: number }> {
    let parentComment = null;
    if (dto.parentCommentId) {
      parentComment = await this.commentsRepository.findOne({ where: { id: dto.parentCommentId } });
      if (!parentComment) {
        throw new CommentsNotFoundException();
      }
    }
    const profile = await this.profileService.getProfileByUserId(userId);
    if (!profile) {
      throw new ProfileNotFoundException();
    }
    let object = {};
    if (dto.kind == TypeofEntityEnum.MOTOTECHNICS) {
      object['mototehnic'] = { id: dto.announcementId };
    } else if (dto.kind == TypeofEntityEnum.ANNOUNCEMENT) {
      object['car'] = { id: dto.announcementId };
    } else if(dto.kind == TypeofEntityEnum.SPARE){
      object['spare'] = { id: dto.announcementId };
    }
    const comment = await this.commentsRepository.save({ profile, parentComment, text: dto.text, ...object });
    return { id: comment.id };
  }

  async getComments(dto: FilterCommentsQuery): Promise<{ data: Comments[], count: number }> {
    const limit = dto?.limit || 10;
    const page = dto?.page || 1;
    const offset = page * limit - limit;
    const query = await this.commentsRepository.createQueryBuilder('comment')
      .select('comment.id')
      .addSelect('comment.text')
      .addSelect('COUNT(subComments.id)', 'subCount')
      .leftJoin('comment.subComments', 'subComments');

    if (dto?.parentId) {
      query.andWhere('comment.parentCommentId = :parentId', { parentId: dto.parentId });
    }
    if(dto?.carId && !dto.shapeId && !dto.motoId){
      query.andWhere('comment.carId = :carId',{carId:dto.carId})
    }
    if(dto?.motoId && !dto.carId && !dto.shapeId){
      query.andWhere('comment.shapeId = :shapeId',{shapeId:dto.shapeId})
    }

    query.limit(limit);
    query.offset(offset);
    const data = await query.getRawMany();
    const count = await query.getCount();
    return { data, count };
  }
}