import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtistEntity } from "./artist.entity";
import { Repository } from "typeorm";
import { compare, hash } from "bcryptjs";
import { Hash } from "crypto";

@Injectable()
export class ArtistService
{
    constructor(@InjectRepository(ArtistEntity)private readonly artistrepo:Repository<ArtistEntity>){}
    async loginartist(email:string, password: string) {
        const isfound = await this.artistrepo.findOne({where:{email}})
        if(!isfound) {
            throw new HttpException("this email doesn't exist in this database", HttpStatus.NOT_FOUND)
        }
        const ispasswordmatch = await compare(password,isfound.password)
        if (!isfound) {
            throw new HttpException("password is incorrect", HttpStatus.UNAUTHORIZED)
        }
        return isfound;
    } 
    async createartist (data:any)
    {
        const artist= await this.artistrepo.findOne({where:{email:data.email}});
        if (artist){
            throw new HttpException("this email already exist", HttpStatus.BAD_GATEWAY);
            
        }
        const hashedpassword = await hash(data.password, 10);
        const newartist= await this.artistrepo.create({
            name:data.name, 
            email:data.email,
            password:hashedpassword,

        })
        return await this.artistrepo.save(newartist);
    } 
    async deleteartist (id:number){
        const artist= await this.artistrepo.findOne({where:{id}});
        if(!artist)
        {
            throw new HttpException("there is no user", HttpStatus.NOT_FOUND);
        }
        return await this.artistrepo.remove(artist)
    }
    async getallartist (){
        const data = await this.artistrepo.find();
        if(!data){
            throw new HttpException("no data has been found", HttpStatus.NOT_FOUND);
        }
        return data;
    }
}