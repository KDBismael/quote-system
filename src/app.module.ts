import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { NotificationModule } from './notification/notification.module';
import { FollowerModule } from './follower/follower.module';

@Module({
  imports: [
    ArticlesModule,
    AuthModule,
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CommentModule,
    NotificationModule,
    FollowerModule,
  ],
})
export class AppModule {}
