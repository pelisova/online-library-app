import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    //funkcije kontrolera
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);   
    }

    @Get('getAll')
    getAll() {
        return this.userService.getAll();
    }
}
