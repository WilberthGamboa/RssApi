import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRssDto } from './dto/create-rss.dto';
import * as Parser from 'rss-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Rss } from './entities/rss.entity';
import { Model } from 'mongoose';
import { RssMetaData } from './interface/rss.interface';
import { NewsService } from 'src/news/news.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import { filtrarStringImg } from './helpers/filtroHtmlImg.helper';
import { uuidImgGenerator } from './helpers/uuid.helper';
import { generateImg } from './helpers/generateImg.helper';

// ! Debemos intentar que se separar la lógica de la creación del rss y del new
@Injectable()
export class RssService {

  constructor(
    @InjectModel(Rss.name)
    private readonly rssModel: Model<Rss>,

    private readonly newsService: NewsService,
    
    private readonly httpService: HttpService
  ) { }
  // Empezando
  async create(createRssDto: CreateRssDto) {

    const rss = await this.rssModel.findOne({ rssUrl: createRssDto.rssUrl });
    /*
    Validamos primero que el rss no exista antes de intentar parsear la url, ya que lo segundo es un procedimiento más pesado
    */
    if (rss) {
      throw new BadRequestException('La url ya existe')

    }
    /*
      Inicializamos el Rss, de igual forma nos encargamos de validar que el mismo se pueda parsear
    */
    const parser = new Parser();
    let rssMetaData: RssMetaData;
    let rssItems;

    try {
      const rssParser = await parser.parseURL(createRssDto.rssUrl);
      const { items, ...rssParserData } = rssParser;
      rssMetaData = {
        rssUrl: createRssDto.rssUrl,
        ...rssParserData
      }
      rssItems = items;


    } catch (error) {

      throw new BadGatewayException('La url introducida no es válida para Rss');
    }

    /*
    Realizamos una segunda validación debido a que puede existir que aunque nosotros realizamos la validación con anterioridad,
    algún usuario haya insertado un dato, por lo que es importante manejar este error.

    */
    try {
      // Guardamos el url del rss
      const rssSaved = await this.rssModel.create(rssMetaData);

      const itemContent = rssItems[0].content;

      const itemContentImg = filtrarStringImg(rssItems[0].content);
      // ! Empezamos a validar las img
      // Primero validamos que si está el contentSniped
      let responseArray: Array<any> = [];


      // !VALIDACIÓN 1 IMG
      if (itemContent && itemContentImg) {
        // this.imageProcessingService.saveImgByHtml()

        const promiseArray = rssItems.map((rssItem: { content: String; }) => {
          const rssItemContentFiltered = filtrarStringImg(rssItem.content);

          const response = firstValueFrom(this.httpService.get(rssItemContentFiltered, { responseType: 'arraybuffer' }));
          return response;
        })

        responseArray = await Promise.all(promiseArray);

        const rssItemsProcessed = await Promise.all(
          rssItems.map((item, index: number) => {
            const imgName = uuidImgGenerator();
            generateImg(responseArray[index].data, imgName);

            return {
              ...item,
              rss: rssSaved._id,
              image: imgName,

            }

          })

        )
  
        await this.newsService.createMany(rssItemsProcessed);


      }

      // !VALIDACIÓN 2 IMG

      if (rssMetaData.image && rssMetaData.image.url) {
        const response = await firstValueFrom(this.httpService.get(rssMetaData.image.url, { responseType: 'arraybuffer' }));
        const imgName = uuidImgGenerator();
        await generateImg(response.data, imgName);
        const data = rssItems.map((item) => {
          return {
            ...item,
            rss: rssSaved._id,
            image: imgName,

          }
        })

        await this.newsService.createMany(data);

      }
      return rssSaved;
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        throw new BadRequestException(`El rss ya existe en la db ${JSON.stringify(error.keyValue)}`);
      }
      throw new InternalServerErrorException(`No se logró guardar el rss`);
    }

  }
  // ! FIUN
  async findAll() {
    const rss = await this.rssModel.find({});
    return rss;
  }
  //!Todos estos estarán pendientes 

  async findOne(term: string) {

    const rss = await this.rssModel.findOne({ _id: term })

    if (!rss) {
      throw new NotFoundException('No se encontró el rss');
    }

    return rss;
  }
  // ! UPDATE 

  async update() {

    this.newsService.removeAllNewsAndImg();



    const allrss = await this.rssModel.find({});

    await Promise.all(allrss.map(async (createRssDto) => {

      const parser = new Parser();
      let rssMetaData: RssMetaData;
      let rssItems;

      try {
        console.log(createRssDto.link)
        const rssParser = await parser.parseURL(createRssDto.feedUrl);

        const { items, ...rssParserData } = rssParser;
        rssMetaData = {
          rssUrl: createRssDto.rssUrl,
          ...rssParserData
        }
        rssItems = items;
      } catch (error) {

        throw new BadGatewayException('La url introducida no es válida para Rss');
      }

      /*
      Realizamos una segunda validación debido a que puede existir que aunque nosotros realizamos la validación con anterioridad,
      algún usuario haya insertado un dato, por lo que es importante manejar este error.
  
      */
      try {
        // Guardamos el url del rss


        const itemContent = rssItems[0].content;

        const itemContentImg = filtrarStringImg(rssItems[0].content);
        // ! Empezamos a validar las img
        // Primero validamos que si está el contentSniped
        let responseArray: Array<any> = [];

        if (itemContent && itemContentImg) {
          // this.imageProcessingService.saveImgByHtml()

          const promiseArray = rssItems.map((rssItem: { content: String; }) => {
            const rssItemContentFiltered = filtrarStringImg(rssItem.content);

            const response = firstValueFrom(this.httpService.get(rssItemContentFiltered, { responseType: 'arraybuffer' }));
            return response;
          })

          responseArray = await Promise.all(promiseArray);

          const rssItemsProcessed = await Promise.all(
            rssItems.map((item, index: number) => {
              const imgName = uuidImgGenerator();
              const filePath = path.join(process.cwd(), '/src/upload', imgName);
              try {
                fs.promises.writeFile(filePath, responseArray[index].data);
              } catch (error) {

              }
              return {
                ...item,
                rss: createRssDto._id,
                image: imgName,

              }
            })

          )

          return await this.newsService.createMany(rssItemsProcessed);


        }
        // !  Imagen por defecto de portada

        // https://feeds.simplecast.com/54nAGcIl

        if (rssMetaData.image.url) {

          const response = await firstValueFrom(this.httpService.get(rssMetaData.image.url, { responseType: 'arraybuffer' }));

          const imgName = uuidImgGenerator();
          const filePath = path.join(process.cwd(), '/src/upload', imgName);

          try {
            fs.promises.writeFile(filePath, response.data);
          } catch (error) {

          }

          const data = rssItems.map((item) => {
            return {
              ...item,
              rss: createRssDto._id,
              image: imgName,

            }
          })



          return await this.newsService.createMany(data);

        }



      } catch (error) {
        if (error.code === 11000) {
          throw new BadRequestException(`El rss ya existe en la db ${JSON.stringify(error.keyValue)}`);
        }
        throw new InternalServerErrorException(`No se logró guardar el rss`);
      }

    }))



  }

  async remove(id: string) {

    const rss = await this.findOne(id);

    if (!rss) {
      throw new BadRequestException(`El id: ${id} no fue encontrado`);
    }
    await this.newsService.deleteAll(id);
    await this.rssModel.deleteOne({ _id: id })

    return `This action removes a #${id} rss`;
  }
}
