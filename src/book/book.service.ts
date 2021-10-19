import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}

    async addBook(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        await this.bookRepository.save(book);
        return book;
    }

    async getAllBooks(): Promise<Book[]> {
        const books = await this.bookRepository.find();
        if(books.length===0) {
            throw new NotFoundException('Sorry, books are not found!');
        }
        return books;
    }

    async getBookById(id:string): Promise<Book> {
        const book = await this.bookRepository.findOne(id);
        if(!book){
            throw new NotFoundException(`Book #${id} is not found`);
        }
        return book;
    }

    async removeBook(id:string, updateBookDto: UpdateBookDto): Promise<Book> {
        const { status } = updateBookDto;
        const book = await this.getBookById(id);
        book.status = status;
        return await this.bookRepository.save(book);
    }
}
