import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {

    getStaticProductImage(imageName:string){
        const path = join(process.cwd(),'/src/upload/', imageName);
        console.log(path);
        if (!existsSync(path)) {
            throw new BadRequestException('No se encontró la imagen: '+ imageName);
            
        }

    return path;
    }
 
}