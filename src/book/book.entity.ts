import { BooksRented } from "src/books-rented/books-rented.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookCategory, BookStatus } from "./enum";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;
    
    @Column()
    publisher: string;

    @Column()
    category: BookCategory;

    @Column()
    printerPlace: string;

    @Column()
    status: BookStatus;

    // @OneToMany(type => BooksRented, bookRented => bookRented.book)
    // booksRented: BooksRented[];
}