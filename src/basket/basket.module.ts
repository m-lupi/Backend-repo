import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketEntity } from "./basket.entity";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";

@Module({
    imports: [TypeOrmModule.forFeature([BasketEntity])],
    controllers:[BasketController],
    providers:[BasketService],
    exports: []
})
export class BasketModule{}