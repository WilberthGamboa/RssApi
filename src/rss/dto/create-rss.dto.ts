import { IsString } from "class-validator";

export class CreateRssDto {
    @IsString()
    url: string;
    name:string;
}
