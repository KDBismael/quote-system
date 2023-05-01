import { Injectable, HttpException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Post, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import _ = require('lodash');
@Injectable()
export class ArticlesService {
  constructor(private prismaService: PrismaService) {}
  async create(article: CreateArticleDto, user: User): Promise<Post> {
    if (_.isEmpty(article)) throw new HttpException('No data provided!', 400);
    article.like = Number(article.like);
    article.authorId = user.id;
    return await this.prismaService.post.create({ data: article });
  }

  async findAll(): Promise<Post[]> {
    return await this.prismaService.post.findMany();
  }

  async findOne(id: number): Promise<Post> {
    if (id)
      return await this.prismaService.post.findFirstOrThrow({
        where: { id: id },
      });
    throw new HttpException('No id provided!', 400);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Post> {
    if (_.isEmpty(updateArticleDto))
      throw new HttpException('No data provided!', 400);
    if (updateArticleDto.like)
      updateArticleDto.like = Number(updateArticleDto.like);
    return await this.prismaService.post.update({
      data: updateArticleDto,
      where: { id: id },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    if (!id) throw new HttpException('No id provided!', 400);
    await this.prismaService.post.delete({ where: { id: id } });
    return { message: 'Article deleted successfully' };
  }
}
