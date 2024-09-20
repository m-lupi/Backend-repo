import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ArtistService } from "./artist.service";

@Controller("/artist")
export class ArtistController{
    constructor(
        private readonly ArtistService: ArtistService
    ) {}
    @Post('/register')
    async register(@Body() data:any){
        return await this.ArtistService.createartist(data)
    }
    @Post('/login')
    async login (@Body() data:any){
        return await this.ArtistService.loginartist(data.email, data.password);

    }
    @Get("/getallartist")
    async getalluser(){
        return await this.ArtistService.getallartist()
    }
    @Delete("/deleteartist/:id")
    async deleteartist(@Param('id') id:number){
        return await this.ArtistService.deleteartist(id)
    }
}
