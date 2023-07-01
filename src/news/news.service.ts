import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './entities/news.entity';
import { Model, Types } from 'mongoose';
import * as fs from 'fs'

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NewsPaginationDto } from './dto/newsPagination.dto';
import path, { join } from 'path';


@Injectable()
export class NewsService {
  
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>


  ){

  }
  async findAll(newsPaginationDto:NewsPaginationDto) {
    const {limit = 10, offset = 0,title='',contentSnippet='',creator=''} = newsPaginationDto;

  
    const news = await this.newsModel.find(
      {
        $or: [
          { title: { $regex: title, $options: "i" } },
          { contentSnippet: { $regex: contentSnippet, $options: "i" } },
          { creator: { $regex: creator, $options: "i" }}
        ]
      
      }
    )
    .limit(limit)
    .skip(offset)
    .lean()
 
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
    const newsInserted = await this.newsModel.insertMany(createNewsDto)
  
    return newsInserted;
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

  async updateAll(){
    this.borrarCarpeta(join(process.cwd(),'/src/upload/'));
    this.crearCarpeta(join(process.cwd(),'/src/upload/'));
    this.newsModel.deleteMany({})

  }
  
   borrarCarpeta = (ruta) => {
    if (fs.existsSync(ruta)) {
      fs.readdirSync(ruta).forEach((archivo) => {
        const archivoRuta = `${ruta}/${archivo}`;
        if (fs.lstatSync(archivoRuta).isDirectory()) {
          this.borrarCarpeta(archivoRuta);
        } else {
          fs.unlinkSync(archivoRuta);
        }
      });
      fs.rmdirSync(ruta);
    }
  };
  
  // Función para crear una carpeta
   crearCarpeta = (ruta) => {
    if (!fs.existsSync(ruta)) {
      fs.mkdirSync(ruta);
    }
  };
  
}
