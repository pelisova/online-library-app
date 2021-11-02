import { UserRole } from "../user-role";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, Validate} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


/**
 * Passwords will contain at least 1 upper case letter, 1 lower case letter, 1 number or special character.
 */

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
    readonly email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak!' })
    readonly password:string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    readonly verified?:boolean;

    @ApiProperty()
    @IsEnum(UserRole)
    @IsOptional()
    readonly role?:UserRole;
  }