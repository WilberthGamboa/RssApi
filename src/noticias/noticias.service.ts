import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { PaginationDto } from './dto/paginationDto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Noticia } from './entities/noticia.entity';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectModel(Noticia.name)
    private readonly noticiaModel:Model<Noticia>
  
  
  ){}

  async create(createNoticiaDto: CreateNoticiaDto) {
   // console.log(createNoticiaDto)
    try {
      const x = await this.noticiaModel.create(createNoticiaDto);
      console.log("dto");
      console.log(createNoticiaDto)
      console.log("dto");
      console.log(x);
    } catch (error) {
      console.log(error);
    }
  }

  findAll(paginationDto:PaginationDto) {
    //FECHA NUEVA 
    const prueba = paginationDto.fecha
    const x = new Date(prueba);
    console.log(paginationDto.fecha)
    console.log(x.toLocaleDateString());

        const fechaActual=new Date().toLocaleDateString();
    console.log(fechaActual)
  //  console.log(fechaActual)
    const noticias = this.noticiaModel.find({
      fecha:fechaActual

    });
    return noticias;
    
    return `This action returns all noticias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noticia`;
  }

  update(id: number, updateNoticiaDto: UpdateNoticiaDto) {
    return `This action updates a #${id} noticia`;
  }

  remove(id: number) {
    return `This action removes a #${id} noticia`;
  }
}
