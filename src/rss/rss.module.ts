/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rss, RssSchema } from './entities/rss.entity';
import { NoticiasService } from 'src/noticias/noticias.service';
import { Noticia, NoticiasSchema } from 'src/noticias/entities/noticia.entity';


@Module({
  controllers: [RssController],
  providers: [RssService,NoticiasService],
  imports:[
    MongooseModule.forFeature([
      {
        name:Rss.name,
        schema:RssSchema
      },
      {
        name:Noticia.name,
        schema:NoticiasSchema
      }
    ])
  ]
})
export class RssModule {}
