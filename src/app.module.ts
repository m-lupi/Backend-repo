import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/auth.entity';
import { ArtModule } from './Art/art.module';
import { ArtEntity } from './Art/art.entity';
import { ArtistModule } from './Artist/artist.module';
import { ArtistEntity } from './Artist/artist.entity';
import { UserEntity } from './User/user.entity';
import { UserModule } from './User/user.module';
import { BasketModule } from './basket/basket.module';
import { BasketEntity } from './basket/basket.entity';

@Module({
  imports: [AuthModule, ArtistModule, UserModule, ArtModule, BasketModule, TypeOrmModule.forRoot({
    type:'mysql', 
    host:'localhost',
    username: 'root',
    password: '',
    entities: [AuthEntity, ArtEntity, ArtistEntity, UserEntity, BasketEntity],
    synchronize: true,
    database: 'art_gallery_nestjs'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
