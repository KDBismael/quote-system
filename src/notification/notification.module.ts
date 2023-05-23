import { Global, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport} from '@nestjs/microservices';

@Global()
@Module({
  imports:[ClientsModule.register([{
    name:'NOTIFICATION_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls: ['amqp://localhost:5672'],
      queue:"notificationsQueue",
      queueOptions: {
        durable: false
      },
    }
  }])],
  providers: [NotificationService],
  exports:[NotificationService]
})
export class NotificationModule {}
