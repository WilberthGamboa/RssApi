/* eslint-disable prettier/prettier */
import { ArrayNotEmpty, ArrayUnique, IsArray, IsString, IsUrl } from "class-validator";

export class CreateRssDto {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsUrl({}, { each: true })
    url: Array<string>;
    name:string;
}
