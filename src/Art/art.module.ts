import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtEntity } from "./art.entity";
import { ArtController } from "./art.controller";
import { ArtService } from "./art.service";

@Module({
    imports:[TypeOrmModule.forFeature([ArtEntity])],
    controllers:[ArtController],
    providers:[ArtService]
})
export class ArtModule {

}
