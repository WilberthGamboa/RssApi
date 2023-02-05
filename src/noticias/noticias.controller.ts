import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { PaginationDto } from './dto/paginationDto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    
   
    
    return this.noticiasService.findAll(paginationDto);
  }
  @Get('/fecha')
  findAllFecha(@Query() paginationDto:PaginationDto){

    return this.noticiasService.findAllFecha(paginationDto);

  }
  @Get('/url')
  findAllUrl(@Query() paginationDto:PaginationDto){
    return this.noticiasService.findAllUrl(paginationDto);

  }

  @Get('/titulo')
  findAllTitulo(@Query() paginationDto:PaginationDto){
    return this.noticiasService.findAllTitulo(paginationDto);
  }
  @Get('/box')
  findAllBox(@Query() paginationDto:PaginationDto){
    return this.noticiasService.findAllBox(paginationDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiasService.update(+id, updateNoticiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticiasService.remove(+id);
  }
}
