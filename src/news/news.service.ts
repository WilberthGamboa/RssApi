import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './entities/news.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/create-common.dto';

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
  
  async findAll(paginationDto:PaginationDto) {
    const {limit = 1, offset = 0} = paginationDto;
    const news = await this.newsModel.find()
    .limit(limit)
    .skip(offset)
    .lean()
 
    
  const newsWithImg =  news.map((note) =>{
        const {image,...newWithoutImage} = note
        const ejemplo = {
          ...newWithoutImage,
          image:{
            download :`http://localhost:3000/files/download/${image}`,
            see : `http://localhost:3000/files/see/${image}`
          }
        }
        return ejemplo;
    })
    return newsWithImg;
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

}
