import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BasketEntity } from "./basket.entity";
import { Repository } from "typeorm";

@Injectable()
export class BasketService {
    constructor (@InjectRepository(BasketEntity) private readonly basketrepo:Repository<BasketEntity>)
    {}
    async createbasket (data:any)
    {
        const newbasket = this.basketrepo.create({
            fullname:data.fullname,
            artist:data.artist,
            title:data.title,
            telephone:data.telephone,
            adress:data.adress,
            email:data.email,
            state:'pending'
        })
        return await this.basketrepo.save(newbasket)
    }
    async updatestate(id:number){
        const isbasketfound = await this.basketrepo.findOne({where:{id}})
        isbasketfound.state= isbasketfound.state === 'pending'?'pending':'resolved'
        return await this.basketrepo.save(isbasketfound);

    }
    async getallbasket(){
        const data= await this.basketrepo.find({});
        if (!data){
            throw new HttpException('no basket until now', HttpStatus.NOT_FOUND) 
        }
        return data;
    }
    async deletebasketbyid (id:number){
        const basket = await this.basketrepo.findOne({where:{id}})
        if (!basket){
            throw new HttpException('there is no basket by this id', HttpStatus.NOT_FOUND)
        }
        return await this.basketrepo.remove(basket)
    }
}