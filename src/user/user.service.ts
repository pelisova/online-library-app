import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './user-role';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const {firstName, lastName, email, password} = createUserDto;
        const user = this.userRepository.create({
            firstName,
            lastName,
            email,
            password,
            role: UserRole.MEMBER,
            verified:false
        })
        await this.userRepository.save(user);
        return user;
    }     

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        if(users.length==0){
            throw new NotFoundException('Oops! Users are not found!')
        }
        return users;
    }

    async findOne(id:string): Promise<User> {
        const user = await this.userRepository.findOne(id);
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

}
