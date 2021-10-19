import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    //funkcije kontrolera

    @Post('add')
    addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.addBook(createBookDto);
    }

    @Get('getAll')
    getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks();
    }

    @Get('/getOne/:id')
    getBookById(@Param('id') id:string):Promise<Book> {
        return this.bookService.getBookById(id);
    }

    //delete operation is update operation
    //update => set status to not available
    @Patch('/update/:id')
    removeBook(@Param('id') id:string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.bookService.removeBook(id, updateBookDto);
    }
}
