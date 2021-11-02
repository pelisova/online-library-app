import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService:JwtService
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
            throw new BadRequestException('Your email is already in use. Please try with another email!');
        }
        
    }    
    
    async signIn(updateUserDto: UpdateUserDto) {
        const {email, password} = updateUserDto;
        const user = await this.userRepository.findOne({email});

        if(user && user.verified && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { email }; 
            const accessToken: string = await this.jwtService.sign(payload);
            delete user.password;
            return {user, accessToken};
        } else if(!user.verified) {
            throw new UnauthorizedException('Your account has not been verified yet.');
        } else {
            throw new UnauthorizedException('Please check your login credentials.');
        }
        
    }

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.find({relations: ['books']});
        if(users.length==0) {
            throw new NotFoundException('Oops! Users are not found!');
        }
        users.forEach(user => {
            delete user.password;
        });
        return users; 
    }

    async getUnverifiedUsers(): Promise<User[]> {
        const users = await this.userRepository.find({ where: { verified: false } });
        if(users.length==0) {
            throw new NotFoundException('Oops! Users are not found!');
        }
        users.forEach(user => {
            delete user.password;
        });
        return users; 
    }

    async findOne(id:string): Promise<User> {
        const user = await this.userRepository.findOne(id, {relations:['books']});
        if(!user){
            throw new NotFoundException(`User #${id} is not found!`);
        }
        delete user.password;
        return user;
    }

     async findOneEmail(email:string) {
        const user = await this.userRepository.findOne({email}, {relations:['books']});
        if(!user){
            throw new NotFoundException(`User #${email} is not found!`);
        }
        delete user.password;
        return { user };
    }
   
    async removeUser(id:string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.delete(user.id);
    }

    async verifyUser(id:string): Promise<User> {
        const user = await this.findOne(id);
        user.verified = true;
        return await this.userRepository.save(user); 
    }

    async userRole(id:string, updateUserDto:UpdateUserDto): Promise<User> {
        const { role } = updateUserDto;
        const user = await this.findOne(id);
        user.role = role;
        return await this.userRepository.save(user);    
    }

    async getHistory(id:string): Promise<string[]> {
        const user = await this.findOne(id);
        var books = [];
        user.books.forEach(book => {
            books.push(book)
        });
        return books;
    }    

}
