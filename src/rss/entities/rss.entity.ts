/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Rss extends Document{
//el id :string mongo lo da
@Prop({
    unique:true,
    index:true
})
    name:string;

    @Prop({
        unique:true,
        index:true
    })
    url:string;
    //categorías ???

}

export const RssSchema = SchemaFactory.createForClass(Rss);