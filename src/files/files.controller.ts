import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, StreamableFile, Header } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { Response } from 'express';
import { createReadStream } from 'fs';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService,
    
    ) {}
/*
  @Get('product/:imageName')
  @Header('Content-Disposition', 'attachment;')
  findProductImage(
  //  @Res() res: Response,
    @Param('imageName') imageName:string){
    //const path  = this.filesService.getStaticProductImage(imageName);
    const stream = createReadStream(this.filesService.getStaticProductImage(imageName));
    return new StreamableFile(stream);

  }
  */

  @Get('see/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage( imageName );

    res.sendFile( path );
  }
  
  @Get('download/:imageName')
  findProductImages(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage( imageName );

    res.download( path );
  }
  

  
}