import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BasketService } from "./basket.service";

@Controller('basket')
export class BasketController{
    constructor (private readonly basketservice: BasketService){

    }
    @Post('/create')
    async createbasket(@Body()data:any){
        return await this.basketservice.createbasket(data)

    }
    @Get('/getallbasket')
    async getallbasket(){
        return await this.basketservice.getallbasket();
    }
    @Put('/updatestate/:id')
    async updatestate(@Param('id') id:number){
        return await this.basketservice.updatestate(id);
    }
    @Delete('/deletebasket/:id')
    async deletebasket(@Param('id') id:number){
        return await this.basketservice.deletebasketbyid(id)
    }

}