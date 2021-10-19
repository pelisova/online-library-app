import { Controller } from '@nestjs/common';
import { BooksRentedService } from './books-rented.service';

@Controller('books-rented')
export class BooksRentedController {
    constructor(
        private readonly booksRentedService: BooksRentedService
    ) {}
}
