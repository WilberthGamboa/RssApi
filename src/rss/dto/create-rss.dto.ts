/* eslint-disable prettier/prettier */
import { ArrayNotEmpty, ArrayUnique, IsArray, IsString, IsUrl } from "class-validator";
import { Rss } from "../entities/rss.entity";

export class CreateRssDto extends Rss {
    @IsString()
    @IsUrl()
    url: string;
    name:string;
}
