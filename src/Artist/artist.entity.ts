import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArtistEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;

}