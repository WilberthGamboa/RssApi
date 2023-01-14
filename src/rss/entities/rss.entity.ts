import { Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Rss extends Document{
//el id :string mongo lo da
    titulo:string;
    url:string;
    descripcion:string;
    //categorías ???

}
