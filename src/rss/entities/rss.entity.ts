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
    @Prop()
    title?:string;

    @Prop()
    description?: string;

    @Prop()
    feedUrl?: string;

    @Prop({type:Object})
    image?: any;

    @Prop({type:Object})
    itunes?: any;

    @Prop()
    link?: string;

    @Prop({type:Object})
    paginationLinks?: any;

}
export const RssSchema = SchemaFactory.createForClass(Rss);
