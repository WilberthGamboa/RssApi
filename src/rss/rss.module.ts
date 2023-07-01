import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rss, RssSchema } from './entities/rss.entity';
import { NewsService } from 'src/news/news.service';
import { NewsModule } from 'src/news/news.module';
import { HttpModule } from '@nestjs/axios';
import { ImageProcessingServiceHandlerService } from './imageProcessingServiceHandler/imageProcessingServiceHandler.service';


@Module({
  controllers: [RssController],
  providers: [RssService, ImageProcessingServiceHandlerService],
  imports:[
 
    
    MongooseModule.forFeature([
    {
      name:Rss.name,
      schema:RssSchema
    }
  ]),
  HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
  NewsModule
]
})
export class RssModule {}
