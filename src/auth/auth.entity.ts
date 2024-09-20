import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    fullname:string;
    
}