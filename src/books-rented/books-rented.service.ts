import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksRented } from './books-rented.entity';

@Injectable()
export class BooksRentedService {
    constructor(
        @InjectRepository(BooksRented)
        private userRepository: Repository<BooksRented>
    ){}
}
