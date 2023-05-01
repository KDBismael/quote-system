import { Controller } from '@nestjs/common';
import { FollowerService } from './follower.service';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}
}
