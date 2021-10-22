import { Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookStatus } from './enum';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async addBook(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        try {
            await this.bookRepository.save(book);
            return book;
        }catch(e) {
            console.log(e);
            throw new InternalServerErrorException('Title is already in use. Please try with another title!');
        }
        
    }

    async getAllBooks(): Promise<Book[]> {
        const books = await this.bookRepository.find({relations: ['user']});
        if(books.length===0) {
            throw new NotFoundException('Sorry, books are not found!');
        }
        return books;
    }

    async getBookById(id:string): Promise<Book> {
        const book = await this.bookRepository.findOne(id, {relations: ['user']});
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


    async rentBook(userId:string, bookId:string): Promise<Book> {
        const book = await this.getBookById(bookId);
        const user = await this.userRepository.findOne(userId);
        if(!user){
            throw new NotFoundException(`User ${user.firstName} is not found`);
        }
        book.user = user;
        book.status = BookStatus.NOT_AVAILABLE
        return await this.bookRepository.save(book);
    }

}
