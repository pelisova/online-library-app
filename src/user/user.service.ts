import { HttpCode, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './user-role';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const {firstName, lastName, email, password} = createUserDto;
        //hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })

        try {
            await this.userRepository.save(user);
            return user;
        }catch(e) {
            console.log(e);
            throw new InternalServerErrorException('Your email is already in use. Please try with another email!');
        }
        
    }    
    
    async signIn(updateUserDto: UpdateUserDto): Promise<string> {
        const {email, password} = updateUserDto;
        const user = await this.userRepository.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))){
            return 'success'
        }else {
            throw new UnauthorizedException('Please check your login credentials');
        }
        
    }

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.find({relations: ['books']});
        if(users.length==0){
            throw new NotFoundException('Oops! Users are not found!')
        }
        return users;
    }

    async findOne(id:string): Promise<User> {
        const user = await this.userRepository.findOne(id, {relations:['books']});
        if(!user){
            throw new NotFoundException(`User #${id} is not found!`);
        }
        return user;
    }
   
    async removeUser(id:string): Promise<void> {
        const result = await this.userRepository.delete(id);
        if(result.affected===0) {
            throw new NotFoundException(`User with #${id} can not be found!`);
        }
        // console.log(result);
    }

    async verifyUser(id:string, updateUserDto:UpdateUserDto): Promise<User> {
        const { verified } = updateUserDto;
        const user = await this.findOne(id);
        user.verified = verified;
        return await this.userRepository.save(user);
    }

    async userRole(id:string, updateUserDto:UpdateUserDto): Promise<User> {
        const { role } = updateUserDto;
        const user = await this.findOne(id);
        user.role = role
        return await this.userRepository.save(user);
    }

    verifyBook():string {
        return 'accepted';
    }


    async getHistory(id:string): Promise<string[]> {
        const user = await this.findOne(id);
        var books = [];
        user.books.forEach(book => {
            books.push(book.title)
        });
        return books;
    }    

}
