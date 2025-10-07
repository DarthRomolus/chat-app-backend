import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { DatabaseModule } from 'src/database/database.module';
import { MessagesController } from './messages.controller';

@Module({
  imports: [DatabaseModule],
  providers: [MessagesService],
  exports: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
