import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationDto } from 'src/common/dto/create-common.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    console.log(paginationDto)
    return this.newsService.findAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  
}
