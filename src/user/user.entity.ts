import { Book } from "src/book/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;
    
    @Column({unique:true})
    email:string;

    @Column({select:false})
    password:string;

    @Column('text', {default:UserRole.MEMBER})
    role:UserRole;

    @Column({default:false})
    verified:boolean;

    @OneToMany(type => Book, book => book.user, { cascade: true}) 
    books: Book[];
    
}