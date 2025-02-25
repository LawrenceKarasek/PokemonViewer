import { Module } from '@nestjs/common';
import { DbConfigService } from './db-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Profile } from './entities/profile.entity';
import { PokemonSeederService } from './seeders/pokemon-seeder.service';
import { PokemonSeederController } from './seeders/pokemon-seeder.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
    }),
    TypeOrmModule.forFeature([Pokemon, Profile]),
  ],
  providers: [PokemonSeederService],
  controllers: [PokemonSeederController],
  exports: [PokemonSeederService],
})
export class DbModule {}
