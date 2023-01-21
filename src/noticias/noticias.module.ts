import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Noticia, NoticiasSchema } from './entities/noticia.entity';

@Module({
  controllers: [NoticiasController],
  providers: [NoticiasService],
  imports:[
    MongooseModule.forFeature([
     
      {
        name:Noticia.name,
        schema:NoticiasSchema
      }
    ])
  ]
})
export class NoticiasModule {}
