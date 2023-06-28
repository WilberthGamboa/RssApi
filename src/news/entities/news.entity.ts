import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class News extends Document{
    
    

    @Prop({ type: Types.ObjectId, ref: 'Rss' }) // Referencia al modelo de RSS

    rss: Types.ObjectId;
}
