/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { RssService } from './rss.service';

import { Cache } from 'cache-manager';

import { UpdateRssDto } from './dto/update-rss.dto';

import { CreateRssDto } from './dto/create-rss.dto';

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService,@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  @Post()
  async create(@Body() createRssDtoDB: CreateRssDto) {
    return this.rssService.create(createRssDtoDB);
  }

  @Get()
  async findAll() {
    const key = 'my-key';
    let data = await this.cache.get(key);
    if (!data) {
      const response:any =  this.rssService.findAll();
      data = response.data;
      await this.cache.set(key, data, 60);

    }
    return data;


    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rssService.findOne(id);
  }
  @Patch()
  updateAll(){
    return this.rssService.updateAll();
    
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRssDto: UpdateRssDto) {
    return this.rssService.update(+id, updateRssDto);
  }

  @Delete('')
  remove() {
    return this.rssService.remove();
  }

}
