import { IsDate, IsDateString, IsOptional } from "class-validator";

export class PaginationDto{
    @IsDateString()
    @IsOptional()
    fecha?:Date;
    @IsOptional()
    desde?:number;
    @IsOptional()
    limite?:number;
    @IsOptional()
    busqueda?:string;
}