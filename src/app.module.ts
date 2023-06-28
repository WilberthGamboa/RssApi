import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    RssModule,
    MongooseModule.forRoot(process.env.MONGODB),
    NewsModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
