/* eslint-disable prettier/prettier */
import { ArrayNotEmpty, ArrayUnique, IsArray, IsString, IsUrl } from "class-validator";

export class CreateRssDto {
    @IsString()
    @IsUrl()
    url: string;
    name:string;
}
