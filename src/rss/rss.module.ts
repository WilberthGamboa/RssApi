/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rss, RssSchema } from './entities/rss.entity';
import { NoticiasService } from 'src/noticias/noticias.service';


@Module({
  controllers: [RssController,NoticiasService],
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
