import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BookCategory, BookStatus } from "../enum";

export class CreateBookDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly title:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly author:string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly publisher:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly printingHouse:string;

    @ApiProperty()
    @IsEnum(BookCategory)
    readonly category:BookCategory;

    @ApiProperty()
    @IsEnum(BookStatus)
    readonly status: BookStatus 
}