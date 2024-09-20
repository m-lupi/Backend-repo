import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController{
    constructor(private readonly userservice:UserService){}
    @Post("/createuser") 
    async createuser(@Body()data:any){
        return await this.userservice.createuser(data)
    }
    @Post("/autenticate")
    async autentication (@Body()data:any){
        return await this.userservice.autenticate(data.email, data.password)
    }
    @Delete('/:id')
    async deleteuser (@Param('id') id:number)
    {
        return await this.userservice.deleteuser(id)
    }
    @Get('/getalluser')
    async getalluser(){
        return await this.userservice.getalluser()
    }
}