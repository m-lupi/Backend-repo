import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArtEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    price:string;
    @Column()
    artist:string;
    @Column()
    description:string;
    @Column()
    date:Date;
    @Column()
    image:string;
}