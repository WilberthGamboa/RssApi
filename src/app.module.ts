import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [RssModule,
  MongooseModule.forRoot('')
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
