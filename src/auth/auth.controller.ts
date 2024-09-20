import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController{
    constructor(
        private readonly authservice: AuthService
    ){}
    @Post('/register')
    async register(@Body() data:any){
        return await this.authservice.register(data.email, data.password, data.fullname)
    }
    @Post('/login')
    async login (@Body() data:any){
        return await this.authservice.login(data.email, data.password);

    }
    @Get("/getalluser")
    async getalluser(){
        return await this.authservice.GetAllUser()
    }
    @Delete("/deleteuser/:id")
    async deleteuser(@Param('id') id:number){
        return await this.authservice.DeleteUser(id)
    }
}

