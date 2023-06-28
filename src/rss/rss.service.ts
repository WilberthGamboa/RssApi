import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import * as Parser from 'rss-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Rss } from './entities/rss.entity';
import { Model } from 'mongoose';
import { RssInterface } from './interface/rss.interface';
import { NewsService } from 'src/news/news.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import { filtrarStringImg } from './helpers/filtroHtmlImg.helper';
import { uuidImgGenerator } from './helpers/uuid.helper';



@Injectable()
export class RssService {

  constructor(
    @InjectModel(Rss.name)
    private readonly rssModel: Model<Rss>,
    
    private readonly newsService : NewsService,
    private readonly httpService: HttpService
  ){}
  // Empezando
  async create(createRssDto: CreateRssDto) {
    /*
    Validamos primero que el rss no exista antes de intentar parsear la url, ya que lo segundo es un procedimiento más pesado
    */
    const rss = await this.rssModel.findOne({rssUrl:createRssDto.rssUrl})
      if (rss) {
        throw new BadRequestException('La url ya existe')
        
      }

    const parser = new Parser();
    let rssData:RssInterface;
      let test;
      try {
      const rssParser = await parser.parseURL(createRssDto.rssUrl);
      const  {items,...rssParserData} = rssParser;
      rssData = {
        rssUrl:createRssDto.rssUrl,
        ...rssParserData
      }
     test = items
     
    
    } catch (error) {
      
      throw new BadGatewayException('La url introducida no es válida para Rss');
    }

    /*
    Realizamos una segunda validación debido a que puede existir que aunque nosotros realizamos la validación con anterioridad,
    algún usuario haya insertado un dato, por lo que es importante manejar este error.

    */
    try {
      // Guardamos el url del rss
    const rssSaved = await this.rssModel.create(rssData);

      // Primero validamos que si está el contentSniped
      let responseArray;
      if (test[0].content) {
          const promiseArray =  test.map (item =>{
            const imgSrcs = filtrarStringImg(item.content);
            const response =  firstValueFrom(this.httpService.get(imgSrcs, { responseType: 'arraybuffer' }));
            return response;
          })
         responseArray =  await Promise.all(promiseArray);
         console.log(responseArray)
      }
     
 
      const data = await Promise.all(
        test.map( (item,index)=>{
          const imgName = uuidImgGenerator();
          const filePath =  path.join(process.cwd(),'/src/upload', imgName);
          try {
                fs.promises.writeFile(filePath, responseArray[index].data);
          } catch (error) {
            
          }
        //  console.log('Imagen guardada en disco:', filePath);
   
          return{
            ...item,
            rss : 'rssSaved._id',
            image:imgName,
           
          }
        })

      ) 
 
      return await this.newsService.createMany(data);
    } catch (error) {
      if (error.code ===11000) {
        throw new BadRequestException(`El rss ya existe en la db ${JSON.stringify(error.keyValue)}`);  
      }
      throw new InternalServerErrorException(`No se logró guardar el rss`);
    }


    

  }

  async findAll() {
    const rss = await this.rssModel.find({});
    return rss;
  }
//!Todos estos estarán pendientes 

  async findOne(term: string,thorwMsg?:string) {
    
    const rss = await this.rssModel.findOne({rssUrl:term})

    if (!rss) {
      if(!thorwMsg){
        throw new NotFoundException('No se encontró el rss');
      }else{
        throw new BadRequestException(thorwMsg);
      }
   
      
    }

    return rss;
  }

  update(id: number, updateRssDto: UpdateRssDto) {
    return `This action updates a #${id} rss`;
  }

  remove(id: number) {
    return `This action removes a #${id} rss`;
  }
}
