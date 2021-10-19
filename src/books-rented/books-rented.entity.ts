import { Book } from "src/book/book.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksRented {
        
    // @ManyToOne(type => User, user => user.booksRented, {primary: true})
    // user: User;

    // @ManyToOne(type => Book, book => book.booksRented, {primary: true})
    // book: Book;

    @PrimaryColumn()
    dateFrom: Date;

    @PrimaryColumn()
    dateTo: Date;
}