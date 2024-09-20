import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasketEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email:string
    @Column()
    telephone:string
    @Column()
    adress:string
    @Column()
    fullname:string
    @Column()
    artist:string
    @Column()
    title:string
    @Column({default:'pending'})
    state:string


}