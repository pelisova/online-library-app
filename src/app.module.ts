import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Book } from './book/book.entity';
import { BooksRentedModule } from './books-rented/books-rented.module';
import { BooksRented } from './books-rented/books-rented.entity';

// importing modules which are used in app,
// connection with database.
@Module({
  imports: [UserModule, BookModule, BooksRentedModule, TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'library',
      entities: [User, Book, BooksRented],
      autoLoadEntities: true,
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
