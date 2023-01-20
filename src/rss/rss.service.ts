/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as Parser from 'rss-parser';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import { Rss, RssSchema } from './entities/rss.entity';
@Injectable()
export class RssService {
  constructor(
    @InjectModel(Rss.name)
    private readonly rssModel: Model<Rss>,
  ) {}
  async create(createRssDtoDB: CreateRssDto) {
   
    
    const rssExiste = await this.rssModel.exists({ url: createRssDtoDB.url });
    if (rssExiste) {
      throw new BadRequestException('La url ya está registrada');
    }

    let newRss;
    //Validamos que se pueda crear el rss
    try {
      const parser = new Parser();
      const feed = await parser.parseURL(createRssDtoDB.url);
      newRss = feed;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Url no válida');
    }

    try {
      const rssCreado = await this.rssModel.create(createRssDtoDB);
      return rssCreado;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('SE NOS CAE EL SERVER ');
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
