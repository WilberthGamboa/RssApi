import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @IsPositive()
    @Max(50)
    //Transformar
    @Type(()=>Number)
    limit?:number;


    @IsOptional()
    @Min(0)
    //Transformar
    @Type(()=>Number)
    offset?:number;
}