import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthEntity } from "./auth.entity";
import { Repository } from "typeorm";
import {hash, compare}from "bcryptjs";


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(AuthEntity) private readonly authrepo: Repository<AuthEntity>
    ){}
    async register(email:string, password:string, fullname:string)
    {
        const IsUserFound = await this.authrepo.findOne({where:{email}})
        if (IsUserFound)
        {
            throw new HttpException("cet email existe déjà", HttpStatus.BAD_REQUEST)
        }
        const HashedPassWord = await hash(password, 10);
        const User = this.authrepo.create({
            email, password: HashedPassWord, fullname
        });
        return await this.authrepo.save(User);
    }
        async login (email:string, password:string) /* async est pour la syncronisation de la fonction */
        {
            const IsUserFound = await this.authrepo.findOne({where:{email}})
        if (!IsUserFound)
        {
            throw new HttpException("this email doesn't exist", HttpStatus.BAD_REQUEST)
        }
        const IsPassWordMatch = await compare(password, IsUserFound.password);
        if (!IsPassWordMatch)
        {
            throw new HttpException("password incorrect", HttpStatus.UNAUTHORIZED)
        }
        return IsUserFound;

        }
        async GetAllUser(){
            const data = await this.authrepo.find({});
            if (!data){
                throw new HttpException("there is no data", HttpStatus.NOT_FOUND) /*Exception servent egalement a afficher les erreur ss detruire le programme, car si erreur le programme ss les exception va se cracher.*/
            }
            return data 
        }
        async DeleteUser (id:number){
            const IsUserFound = await this.authrepo.findOne({where:{id}})
            if(!IsUserFound){
                throw new HttpException("User not found", HttpStatus.UNAUTHORIZED)
            }
            return await this.authrepo.remove(IsUserFound)
        }
}


