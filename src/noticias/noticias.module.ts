import { CacheModule, Module } from '@nestjs/common';
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
    ]),
    CacheModule.register({
      ttl: 60, // Tiempo de vida en segundos de la caché
    }),
  ]
})
export class NoticiasModule {}
