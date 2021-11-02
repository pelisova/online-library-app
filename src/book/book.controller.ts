import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetLibrarianUser, GetMemberUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

/**
 * Only authenticated user can trigger API. Role authorization is implemented using CustomDecorator (user.decorator.ts).
 * Custom Decorator can be @GetAdminUser(), @GetLibrarianUser() or @GetMemberUser().
 * It is provided as @param user in controller methods.
 * 
 * AuthGuard () is used to prevent unauthorized users from taking actions
 */

@ApiTags('Book')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    /**
     * the endpoint for adding new book in database
     * @param createBookDto 
     * @param user 
     * @returns 
     */
    @Post('add')
    @UseGuards(AuthGuard())
    addBook(@Body() createBookDto: CreateBookDto, @GetLibrarianUser() user: User): Promise<Book> {
        return this.bookService.addBook(createBookDto);
    }

    /**
     * the endpoint for fetching all booka from database
     * @returns 
     */
    @Get('getAll')
    getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks();
    }

    /**
     * the endpoint for fetching book by id from database
     * @param id 
     * @param user 
     * @returns 
     */ 
    @Get('/getOne/:id')
    @UseGuards(AuthGuard())
    getBookById(@Param('id') id:string, @GetMemberUser() user: User):Promise<Book> {
        return this.bookService.getBookById(id);
    }

    /**
     * the endpoint to make the book inaccessible
     * @param id 
     * @param updateBookDto 
     * @param user 
     * @returns 
     */
    @Patch('/update/:id')
    @UseGuards(AuthGuard())
    removeBook(@Param('id') id:string, @Body() updateBookDto: UpdateBookDto, @GetLibrarianUser() user: User): Promise<Book> {
        return this.bookService.removeBook(id, updateBookDto);
    }

    /**
     * the endpoint for the book rental by the user
     * @param bookId 
     * @param user 
     * @returns 
     */
    @Patch('/rent/book/:bookId')
    @UseGuards(AuthGuard())
    rentBook(@Param('bookId') bookId:string, @GetMemberUser() user: User): Promise<Book> {
        return this.bookService.rentBook(user.id.toString(), bookId);
    }
}
