import { Type } from "class-transformer";
import { IsMongoId, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class NewsPaginationDto extends PaginationDto{
    @IsOptional()
    @IsString()
    @Type(()=>String)
    title?:string;

    @IsOptional()
    @IsString()
    @Type(()=>String)
    creator?:string;

    @IsOptional()
    @IsString()
    @Type(()=>String)
    contentSnippet?:string;
    @IsOptional()
    @IsMongoId()
    rss:string;

}