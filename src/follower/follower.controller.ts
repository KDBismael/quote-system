import { Body, Controller, Post,UseGuards } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { followDto } from './dto/comment-dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller()
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}
  @Post('follow')
  async follow(@Body() dto:followDto){
    return await this.followerService.follow(+dto.followedId);
  }

  @Post('unfollow')
  async unFollow(@Body() dto:followDto){
    return await this.followerService.unFollow(+dto.followedId);
  }
}

