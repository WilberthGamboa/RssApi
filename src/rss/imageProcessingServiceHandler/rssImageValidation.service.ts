import { Injectable } from '@nestjs/common';
import { filtrarStringImg } from '../helpers/filtroHtmlImg.helper';
import { uuidImgGenerator } from '../helpers/uuid.helper';
import { generateImg } from '../helpers/generateImg.helper';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RssImageValidation{

    constructor(
        private readonly httpService: HttpService
    ){

    }

    async contentSnipped(rssItems,rssSaved){
        
        const promiseArray = rssItems.map((rssItem: { content: String; }) => {
            const rssItemContentFiltered = filtrarStringImg(rssItem.content);
  
            const response = firstValueFrom(this.httpService.get(rssItemContentFiltered, { responseType: 'arraybuffer' }));
            return response;
          })
  
         const  responseArray = await Promise.all(promiseArray);
  
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
        return rssItemsProcessed;
    }

    async rssContent(rssItems,rssSaved,rssMetaData){
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

        return data;

    }

}
