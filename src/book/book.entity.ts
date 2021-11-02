import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookCategory, BookStatus } from "./enum";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    title: string;

    @Column()
    author: string;
    
    @Column()
    publisher: string;

    @Column()
    category: BookCategory;

    @Column()
    printingHouse: string;

    @Column('text')
    status: BookStatus;

    @ManyToOne(type => User, user => user.books)
    user: User;
}