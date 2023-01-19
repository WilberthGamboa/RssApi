/* eslint-disable prettier/prettier */
import { IsArray, IsString, IsUrl } from "class-validator";

export class CreateRssDto {
    @IsArray()
    @IsUrl()
    url: Array<string>;
    name:string;
}
