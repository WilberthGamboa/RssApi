/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as Parser from 'rss-parser';
import { NoticiasService } from 'src/noticias/noticias.service';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import { Rss, RssSchema } from './entities/rss.entity';
@Injectable()
export class RssService {
  constructor(
    @InjectModel(Rss.name)
    private readonly rssModel: Model<Rss>,
    private readonly noticiasService: NoticiasService
  ) {}
  async create(createRssDtoDB: CreateRssDto) {
   
    /*
    const rssExiste = await this.rssModel.exists({ url: createRssDtoDB.url });
    console.log(rssExiste)
    if (rssExiste) {
      throw new BadRequestException('La url ya está registrada');
    }
*/
    
    //Validamos que se pueda crear el rss
    
    try {
      const parser = new Parser();
      const feed = await parser.parseURL(createRssDtoDB.url);
      createRssDtoDB.name=feed.title;


      //creamos el objeto
    try {
      //const rssCreado = await this.rssModel.create(createRssDtoDB);
     // this.noticiasService.create(feed);
     feed.items.forEach(item => {
       this.noticiasService.create(item);
    });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('SE NOS CAE EL SERVER ');
    }




      
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`${createRssDtoDB.url} no válida por el parser`);
    }
    
   
  }

  findAll() {
    return `This action returns all rss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rss`;
  }

  update(id: number, updateRssDto: UpdateRssDto) {
    return `This action updates a #${id} rss`;
  }

  remove(id: number) {
    return `This action removes a #${id} rss`;
  }
}
