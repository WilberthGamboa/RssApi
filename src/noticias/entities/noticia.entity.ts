import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

@Schema()
export class Noticia extends Document{

    @Prop({
        
        index:true
    })
    name:string;
    @Prop({
        
        index:true
    })
    fecha:string;
    @Prop({
        
        index:true
    })
    url:string;
    @Prop({
        
        index:true
    })
    descripcion:string;
    @Prop({
        index:true
        
    })
    categorias:Array<string>;

     /*
   fecha, título, url, descripción y categorías.

  */

}
export const NoticiasSchema = SchemaFactory.createForClass(Noticia);

