import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    createUser(createUserDto: CreateUserDto) {
        //console.log(createUserDto);
        return this.userRepository.save(createUserDto);
    }     

    getAll() {
        return this.userRepository.find();
    }
   
}
