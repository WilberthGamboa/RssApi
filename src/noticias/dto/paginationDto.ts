import { IsDate, IsDateString, IsOptional } from "class-validator";

export class PaginationDto{
    @IsDateString()
    @IsOptional()
    fecha:Date;
}