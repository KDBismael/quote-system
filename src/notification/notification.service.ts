import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
    constructor(@Inject("NOTIFICATION_SERVICE") private clientProxy:ClientProxy){}
  send(pattern:string,data:any){
    this.clientProxy.emit(pattern,data)
  }
}
