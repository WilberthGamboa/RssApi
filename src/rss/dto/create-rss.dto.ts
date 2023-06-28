import { IsString, IsUrl } from "class-validator";

export class CreateRssDto {

    @IsString()
    @IsUrl()
 
    rssUrl: string

}
