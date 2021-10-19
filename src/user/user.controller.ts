import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    //funkcije kontrolera

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);   
    }

    @Get('getAll')
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get('/:id')
    getUserById(@Param('id') id:string): Promise<User>{
        return this.userService.findOne(id);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string): Promise<void>{
        return this.userService.removeUser(id);
    }

    @Patch('/verify/:id')
    verifyUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.verifyUser(id, updateUserDto);
    }

    @Patch('/userRole/:id')
    changeUserRole(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.userRole(id, updateUserDto);
    }

    @Patch('/verify-book')
    verifyBookRental():string {
        return this.userService.verifyBook();
    }

}
