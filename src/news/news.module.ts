import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './entities/news.entity';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports:[
    MongooseModule.forFeature([
      {
        name:News.name,
        schema:NewsSchema
      }
    ])
  ],
  exports:[NewsService]
})
export class NewsModule {}
