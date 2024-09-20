import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    adress: string;
    @Column()
    telephone:string;
}