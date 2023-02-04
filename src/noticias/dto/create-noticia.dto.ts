import mongoose from "mongoose";

export class CreateNoticiaDto {
   id: mongoose.Schema.Types.ObjectId;
  titulo: string;
  fecha:string;
  url:string; 
  descripcion:string;
  categorias:Array<string>;
  /*
   fecha, título, url, descripción y categorías.

  */
}
