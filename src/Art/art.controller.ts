import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ArtService } from "./art.service";

@Controller("Art")
export class ArtController{
    constructor(
        private readonly artservice:ArtService
    ){}

    @Post("/create")
    async createrepo(@Body()data:any)
    {
        return await this.artservice.createart(data)
    }
    @Get("/getalldata")
    async getalldata()
    {
        return await this.artservice.getallart()
    }
    @Delete("deleteart/:id")
    async deleteartbyid(@Param("id") id:number)
    {
        return await this.artservice.deleteart(id)
    }
    @Put("updateart/:id")
    async updateartbyid(@Param("id")id:number, @Body() data:any)
    {
        return await this.artservice.upadateart(id,data)
    }
    @Get("/:id")
    async getartbyid(@Param("id") id:number){
        return await this.artservice.getartbyid(id)
    }

}
