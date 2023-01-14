import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RssService } from './rss.service';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import * as Parser from 'rss-parser';
@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post()
  async create(@Body() createRssDto: CreateRssDto) {
    

    
const parser = new Parser();

async function fetchRssFeed(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    console.log(feed.title);
    /*
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link)
    });
    */
   return feed.title
  } catch (err) {
    console.log(err);
  }
}

const title = await fetchRssFeed('https://www.xataka.com.mx/feedburner.xml');
    return title;
    //return this.rssService.create(createRssDto);
  }

  @Get()
  findAll() {
    return this.rssService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rssService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRssDto: UpdateRssDto) {
    return this.rssService.update(+id, updateRssDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rssService.remove(+id);
  }
}
