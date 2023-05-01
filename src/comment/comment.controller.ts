import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/user/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@User() user, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto, user);
  }

  @Get(':id')
  findByArticle(@Param('id') id: string) {
    return this.commentService.findByArticle(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
