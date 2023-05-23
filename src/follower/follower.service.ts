import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class FollowerService {
    constructor(private prismaService: PrismaService,private notification:NotificationService){}

    async follow(followedId:number){
        await this.prismaService.follower.create({data:{followedId:followedId}})
        let user =await this.prismaService.user.findUnique({where:{id:followedId}})
        this.notification.send('follow',user)
        return {message:`you have followed ${user.fullName}`}
    }

    async unFollow(followedId:number){
        await this.prismaService.follower.delete({where: {followedId:followedId}})
        return {message:`you have unfollowed user with id:${followedId}`}
    }
}
