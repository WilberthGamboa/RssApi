import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    
    MongooseModule.forRoot(process.env.MONGODB),
    RssModule,
    NewsModule,
    CommonModule,
    FilesModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
