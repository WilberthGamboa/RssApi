import { IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateNewsDto  {


    title?:           string;

    creator?:        string;
 
    link?:           string;

    pubDate?:        string;
 
    content?:        string;

    contentSnippet?: string;
    
    guid?:           string;
 
    isoDate?:        string;



    enclosure?:any;

    // Referencia al modelo de RSS
    rss: Types.ObjectId;
    
    
}
