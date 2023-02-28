import mongoose from "mongoose";

export class CreateNoticiaDto {
  idRss: mongoose.Schema.Types.ObjectId;
  titulo: string;
  fecha:string;
  url:string; 
  descripcion:string;
  categorias:Array<string>;
  html:string;
  html2:string;
  /*
   fecha, título, url, descripción y categorías.

  */
}
