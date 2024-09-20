import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { compare, hash } from "bcryptjs";

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) private readonly userrepository:Repository<UserEntity>){}
    async finduserbyid(id:number){
        const isuserfound= await this.userrepository.findOne({where:{id}})
        if(!isuserfound){
            throw new HttpException("no user has been found by this id", HttpStatus.BAD_REQUEST)
        }
            return isuserfound;
        }
         async createuser(data:any){
            const isfound = await this.userrepository.findOne({where:{email:data.email}})
            if(isfound){
                throw new HttpException("this mail already exist", HttpStatus.UNAUTHORIZED)
            }
            const newpassword = await hash(data.password, 10)
            const newclient = this.userrepository.create({
                email:data.email, 
                password:newpassword,
                username: data.username,
                adress: data.adress,
                telephone: data.telephone
            })
            return await this.userrepository.save(newclient)
         }
         async autenticate(email:string, password:string){
            const isemailexist = await this.userrepository.findOne({where:{email}})
            if(!isemailexist){
                throw new HttpException("you are not authorized", HttpStatus.UNAUTHORIZED)
            }
            const ismatch = await compare(password, isemailexist.password)
            if(!ismatch)
            {
                throw new HttpException("something went wrong" , HttpStatus.BAD_REQUEST)
            }
            return isemailexist 
         }
         async deleteuser(id:number){
            const user = await this.finduserbyid(id)
            return await this.userrepository.remove(user)
         }
         async getalluser (){
            return await this.userrepository.find()
         }
         
}
