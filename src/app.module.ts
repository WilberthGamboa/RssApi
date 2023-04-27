import { CacheModule, Module } from '@nestjs/common';
import * as cacheManager from 'cache-manager';
import * as memcachedStore from 'cache-manager-memcached-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NoticiasModule } from './noticias/noticias.module';


@Module({
  imports: [
  RssModule,
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DB_MONGO),
  NoticiasModule,
  CacheModule.register({
    store: cacheManager.caching({
      store: memcachedStore,
      servers: ['localhost:11211'],
      ttl: 60,
    }),
  })
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
