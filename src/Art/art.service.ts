import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtEntity } from "./art.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArtService{
    constructor(
        @InjectRepository(ArtEntity)
        private readonly artrepo:Repository<ArtEntity>
    ){}
    async createart(artdata:any)
    {
        const art = this.artrepo.create({
            title:artdata.title,
            price:artdata.price,
            artist:artdata.artist,
            description:artdata.description,
            date: new Date(),
            image: artdata.image
        })
        return await this.artrepo.save(art)
    }
    async deleteart(id:number){
        const artfound = await this.artrepo.findOne({where:{id}})
        if(!artfound)
        {
            throw new HttpException("art not found by this id", HttpStatus.NOT_FOUND)
        }
        return await this.artrepo.remove(artfound) 
    }
    async getallart(){
        const data=await this.artrepo.find({});
        return data

    }
    async getartbyid(id:number){
        const item = await this.artrepo.findOne({where:{id}})
        return item
    }
    async upadateart(id:number, data:any){
        const arttoupdate = await this.artrepo.findOne({where:{id}})
        if (!arttoupdate)
        {
            throw new HttpException("there is no art to update by this id", HttpStatus.NOT_FOUND)
        }
        arttoupdate.title = data.title?data.title:arttoupdate.title;
        arttoupdate.price = data.price?data.price:arttoupdate.price;
        arttoupdate.description= data.description?data.description:arttoupdate.description;
        arttoupdate.artist = data.artist?data.artist:arttoupdate.artist;
        arttoupdate.image = data.image?data.image:arttoupdate.image;
        
        return await this.artrepo.save(arttoupdate)
    }

}
