import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NewsPaginationDto } from './dto/newsPagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';



@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  
  @Get()
  findAll(@Query() newsPaginationDto:NewsPaginationDto) {

    return this.newsService.findAll(newsPaginationDto);
  }
  
  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: string) {
    return this.newsService.findOne(id);
  }

  
}
