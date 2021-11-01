import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAdminUser, GetLibrarianUser, GetMemberUser} from './user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';


// Only authenticated user can trigger API. Role authorization is implemented using CustomDecorator (user.decorator.ts).
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    //endpoint for creating new user
    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);   
    }

    @Post('signin')
    signIn(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.signIn(updateUserDto)
    }

    //endpoint for fetching all users
    @Get('getAll')
    @UseGuards(AuthGuard())
    getAll(@GetLibrarianUser() user: User): Promise<User[]> {
        return this.userService.getAll();
    }

    // /endpoint for fetching all unverified users
    @Get('getUnverifiedUsers')
    @UseGuards(AuthGuard())
    getUnverifiedUsers(@GetLibrarianUser() user: User): Promise<User[]> {
        return this.userService.getUnverifiedUsers();
    }

    //endpoint for fetching user by id.
    @Get('getById/:id')
    @UseGuards(AuthGuard())
    getUserById(@Param('id') id:string, @GetLibrarianUser() user: User): Promise<User>{
        return this.userService.findOne(id);
    }

    //endpoint for fetching user by id.
    @Get('getByEmail/:email')
    @UseGuards(AuthGuard())
    getUserByEmail(@Param('email') email:string){
        return this.userService.findOneEmail(email);
    }

    //endpoint for deleting user
    @Delete('/:id')
    @UseGuards(AuthGuard())
    removeUser(@Param('id') id:string, @GetLibrarianUser() user: User): Promise<void>{
        return this.userService.removeUser(id);
    }

    //endpoint for verifying user as a member of library
    @Patch('verify/:id')
    @UseGuards(AuthGuard())
    verifyUser(@Param('id') id:string, @GetLibrarianUser() user: User): Promise<User> {
        return this.userService.verifyUser(id);
    }

    //endpoint for verifying user as member of library
    @Patch('userRole/:id')
    @UseGuards(AuthGuard())
    changeUserRole(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto, @GetAdminUser() user: User): Promise<User> {
        return this.userService.userRole(id, updateUserDto);
    }

    //endpoint for verifying book which is rented
    @Patch('verify-book')
    @UseGuards(AuthGuard())
    verifyBookRental():string {
        return this.userService.verifyBook();
    }

    //endpoint for showing history of rented books of user
    @Get('history')
    @UseGuards(AuthGuard())
    getHistoryOfBooks(@GetMemberUser() user: User):Promise<string[]> {
        return this.userService.getHistory(user.id.toString());
    }

}


