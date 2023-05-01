import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import _ = require('lodash');
import { User, Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async create(comment: CreateCommentDto, user: User): Promise<Comment> {
    if (_.isEmpty(comment)) throw new HttpException('no data provided!', 400);
    const data = {
      authorId: user.id,
      vote: +comment.vote,
      postId: +comment.postId,
      content: comment.content,
    };
    return await this.prismaService.comment.create({ data: data });
  }

  async findByArticle(id: number) {
    return await this.prismaService.comment.findMany({ where: { postId: id } });
  }

  async remove(id: number) {
    return await this.prismaService.comment.delete({ where: { id: id } });
  }
}
