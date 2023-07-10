import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './entities/news.entity';
import  { Model, Types } from 'mongoose';
import * as fs from 'fs'
import { NewsPaginationDto } from './dto/newsPagination.dto';
import { join } from 'path';
import { createAndDeleteFolder } from './helpers/createAndDeleteFolder.helper';


@Injectable()
export class NewsService {
  
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>


  ){

  }
  async findAll(newsPaginationDto:NewsPaginationDto) {
    const {limit = 10, offset = 0,title='',contentSnippet='',creator='',rss=''} = newsPaginationDto;
    let test;

    if (rss !== '') {
      test = new Types.ObjectId(rss);
    }
    
    const regexQuery = (field: string, value: string) => ({
      [field]: { $regex: value, $options: 'i' },
    });
    
    const orQuery = [
      ...(title !== '' ? [regexQuery('title', title)] : []),
      ...(contentSnippet !== '' ? [regexQuery('contentSnippet', contentSnippet)] : []),
      ...(creator !== '' ? [regexQuery('creator', creator)] : []),
    ];
    
    const query: any = {
      $or: orQuery,
      ...(rss !== '' && { rss: test }),
    };
    
    const news = await this.newsModel.find(query).limit(limit).skip(offset).lean();
 
    // ! Configurar env 

  const newsWithImg =  news.map((note) =>{
        const {image,...newWithoutImage} = note
        const ejemplo = {
          ...newWithoutImage,
          image:{
            download :`${process.env.URL}files/download/${image}`,
            see : `${process.env.URL}files/see/${image}`
          }
        }
        return ejemplo;
    })
    return newsWithImg;
  }

  async findOne(id: string) {

    const news = await this.newsModel.findOne({ _id: id })

    if (!news) {
      throw new NotFoundException('No se encontró el rss');
    }

    return news;
  }

  async createMany(createNewsDto: CreateNewsDto[]) {
    try {

     await this.newsModel.insertMany(createNewsDto)
    
    } catch (error) {
      console.log(error)
    }
    
   
  }

  async deleteAll(id:string){
    const news = await this.newsModel.find({ rss: new Types.ObjectId(id) });
     
      if (news[0].image===news[1].image && news.length>=2 ){
        try {
          fs.promises.access(join(process.cwd(), '/src/upload/', news[0].image));
          fs.promises.unlink(join(process.cwd(), '/src/upload/', news[0].image));
         console.log('El archivo ha sido eliminado correctamente.');
       } catch (error) {
         console.error('Ocurrió un error al eliminar el archivo:', error);
       }
      }else{
        news.map( async (note) => {
          try {
            await  fs.promises.access(join(process.cwd(), '/src/upload/', note.image));
            await  fs.promises.unlink(join(process.cwd(), '/src/upload/', note.image));
            console.log('El archivo ha sido eliminado correctamente.');
          } catch (error) {
            console.error('Ocurrió un error al eliminar el archivo:', error);
          }
        });

      }
   return this.newsModel.deleteMany({rss:new Types.ObjectId(id)})
  }


  async removeAllNewsAndImg(){
    
    const path = join(process.cwd(),'/src/upload/');
  
    createAndDeleteFolder(join(path));
    await this.newsModel.deleteMany({});

  }

}
