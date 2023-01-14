import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rss, RssSchema } from './entities/rss.entity';

@Module({
  controllers: [RssController],
  providers: [RssService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Rss.name,
        schema:RssSchema
      }
    ])
  ]
})
export class RssModule {}
