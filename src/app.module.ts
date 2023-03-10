import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NoticiasModule } from './noticias/noticias.module';


@Module({
  imports: [RssModule,
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DB_MONGO),
  NoticiasModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
