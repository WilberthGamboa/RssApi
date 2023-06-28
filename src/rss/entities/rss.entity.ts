import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Rss extends Document {

    @Prop({
        unique:true,
        index:true
    })
    rssUrl:string;

    //! Implementado 

    

}
export const RssSchema = SchemaFactory.createForClass(Rss);
