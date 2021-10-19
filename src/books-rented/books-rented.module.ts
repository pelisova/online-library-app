import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRentedController } from './books-rented.controller';
import { BooksRented } from './books-rented.entity';
import { BooksRentedService } from './books-rented.service';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRented])],
  controllers: [BooksRentedController],
  providers: [BooksRentedService]
})
export class BooksRentedModule {}
