import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistEntity } from "./artist.entity";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";

@Module({
    imports:[TypeOrmModule.forFeature([ArtistEntity])],
    controllers:[ArtistController],
    providers:[ArtistService]
})
export class ArtistModule{}