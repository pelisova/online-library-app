import { UserRole } from "../user-role";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly password:string;

    @IsEnum(UserRole)
    readonly role:UserRole;
  }