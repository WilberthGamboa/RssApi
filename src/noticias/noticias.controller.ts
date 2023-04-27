import { Controller, Get, Post, Body, Patch, Param, Delete, Query, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { PaginationDto } from './dto/paginationDto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService,@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto);
  }

  @Get()
  async findAll(@Query() paginationDto:PaginationDto) {
    const key = 'my-key';
    let data = await this.cache.get(key);
    if (!data) {
      const response:any =  this.noticiasService.findAll(paginationDto);
      data = response.data;
      await this.cache.set(key, data, 60);

    }
    return data;
   
    
   
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

  
  remove() {
    return this.noticiasService.remove();
  }
}
