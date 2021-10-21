import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    // A means available and NA means not available
    @Column('text')
    status: BookStatus;

    @ManyToOne(type => User, user => user.books)
    // @JoinColumn()
    user: User;
}