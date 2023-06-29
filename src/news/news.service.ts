import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './entities/news.entity';
import { Model } from 'mongoose';

@Injectable()
export class NewsService {
  
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>


  ){

  }

  async createMany(createNewsDto: CreateNewsDto[]) {
    const newsInserted = await this.newsModel.insertMany(createNewsDto)
   // console.log(newsInserted)
    return newsInserted;
  }

  findAll() {
    
    return this.newsModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

}
