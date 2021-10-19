import { BooksRented } from "src/books-rented/books-rented.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;
    
    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    role:UserRole;

    @Column({default:false})
    verified:boolean;

    // @OneToMany(type => BooksRented, bookRented => bookRented.user) 
    // booksRented: BooksRented[];
    
}