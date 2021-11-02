import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

/**
 * structure of BookModule
 * importing Book entity into TypeOrm feature to create repository for Book entity
 */

@Module({
  imports: [TypeOrmModule.forFeature([Book, User]), UserModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}