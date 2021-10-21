import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    
    //andpoint for adding new book in database
    @Post('add')
    addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.addBook(createBookDto);
    }

    //andpoint for fetching all booka from database
    @Get('getAll')
    getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks();
    }

    //andpoint for fetching book by id from database
    @Get('/getOne/:id')
    getBookById(@Param('id') id:string):Promise<Book> {
        return this.bookService.getBookById(id);
    }

    //andpoint for setting book as not available
    @Patch('/update/:id')
    removeBook(@Param('id') id:string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.bookService.removeBook(id, updateBookDto);
    }

    @Patch('/rent/user/:userId/book/:bookId')
    rentBook(@Param('userId') userId:string, @Param('bookId') bookId:string): Promise<Book> {
        return this.bookService.rentBook(userId, bookId);
    }
}
