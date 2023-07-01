import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RssService } from './rss.service';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post()
  async create(@Body() createRssDto: CreateRssDto) {
    return await this.rssService.create(createRssDto);
  }

  @Get()
  findAll() {
    return this.rssService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) term: string) {
    return this.rssService.findOne(term);
  }

  @Patch()
  update() {
    return this.rssService.update();
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.rssService.remove(id);
  }

  removeAll(){

  }
}
