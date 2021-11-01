import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetLibrarianUser, GetMemberUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Book')
@Controller('book')

export class BookController {
    constructor(private readonly bookService: BookService){}

    //endpoint for adding new book in database
    @Post('add')
    @UseGuards(AuthGuard())
    addBook(@Body() createBookDto: CreateBookDto, @GetLibrarianUser() user: User): Promise<Book> {
        return this.bookService.addBook(createBookDto);
    }

    //endpoint for fetching all booka from database
    @Get('getAll')
    getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks();
    }

    //endpoint for fetching book by id from database (for now!) 
    @Get('/getOne/:id')
    @UseGuards(AuthGuard())
    getBookById(@Param('id') id:string, @GetMemberUser() user: User):Promise<Book> {
        return this.bookService.getBookById(id);
    }

    //endpoint for setting book as not available
    @Patch('/update/:id')
    @UseGuards(AuthGuard())
    removeBook(@Param('id') id:string, @Body() updateBookDto: UpdateBookDto, @GetLibrarianUser() user: User): Promise<Book> {
        return this.bookService.removeBook(id, updateBookDto);
    }

    @Patch('/rent/book/:bookId')
    @UseGuards(AuthGuard())
    rentBook(@Param('bookId') bookId:string, @GetMemberUser() user: User): Promise<Book> {
        return this.bookService.rentBook(user.id.toString(), bookId);
    }
}
