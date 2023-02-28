import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose";
import { Rss } from 'src/rss/entities/rss.entity';

@Schema()
export class Noticia extends Document{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rss' })
    idRss:Rss
    @Prop({
        
        index:true
    })
    titulo:string;
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
    @Prop({
        index:true
        
    })
    html:string;
    @Prop({
        index:true
        
    })
    html2:string

     /*
   fecha, título, url, descripción y categorías.

  */

}
export const NoticiasSchema = SchemaFactory.createForClass(Noticia);

