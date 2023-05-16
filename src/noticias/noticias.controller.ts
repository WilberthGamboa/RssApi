import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { PaginationDto } from './dto/paginationDto';
import { CacheInterceptor, CacheTTL } from '@nestjs/common';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiasService.create(createNoticiaDto);
  }

  @UseInterceptors(CacheInterceptor) // Utilizamos CacheInterceptor directamente
  @CacheTTL(60) // Tiempo de vida en segundos de la caché
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.noticiasService.findAll(paginationDto);
  }

  @UseInterceptors(CacheInterceptor) // Utilizamos CacheInterceptor directamente
  @CacheTTL(60)
  @Get('/fecha')
  findAllFecha(@Query() paginationDto: PaginationDto) {
    return this.noticiasService.findAllFecha(paginationDto);
  }

  @UseInterceptors(CacheInterceptor) // Utilizamos CacheInterceptor directamente
  @CacheTTL(60)
  @Get('/url')
  findAllUrl(@Query() paginationDto: PaginationDto) {
    return this.noticiasService.findAllUrl(paginationDto);
  }

  @UseInterceptors(CacheInterceptor) // Utilizamos CacheInterceptor directamente
  @CacheTTL(60)
  @Get('/titulo')
  findAllTitulo(@Query() paginationDto: PaginationDto) {
    return this.noticiasService.findAllTitulo(paginationDto);
  }

  @UseInterceptors(CacheInterceptor) // Utilizamos CacheInterceptor directamente
  @CacheTTL(60)
  @Get('/box')
  findAllBox(@Query() paginationDto: PaginationDto) {
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
    return this.noticiasService.remove();
  }
}
