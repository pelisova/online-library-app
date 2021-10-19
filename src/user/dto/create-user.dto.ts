import { UserRole } from "../user-role";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, Validate} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    // @Validate(Unique)
    readonly email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly password:string;

    @ApiProperty()
    @IsBoolean()
    readonly verified?:boolean;

    @ApiProperty()
    @IsEnum(UserRole)
    readonly role?:UserRole;
  }