import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    //endpoint for creating new user
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);   
    }

    //endpoint for fetching all users
    @Get('getAll')
    getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    //endpoint for fetching user by id
    @Get('/:id')
    getUserById(@Param('id') id:string): Promise<User>{
        return this.userService.findOne(id);
    }

    //endpoint for deleting user
    @Delete('/:id')
    removeUser(@Param('id') id:string): Promise<void>{
        return this.userService.removeUser(id);
    }

    //endpoint for verifying user as a member of library
    @Patch('/verify/:id')
    verifyUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.verifyUser(id, updateUserDto);
    }

    //endpoint for verifying user as member of library
    @Patch('/userRole/:id')
    changeUserRole(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.userRole(id, updateUserDto);
    }

    //endpoint for verifying book which is rented
    @Patch('/verify-book')
    verifyBookRental():string {
        return this.userService.verifyBook();
    }

}
