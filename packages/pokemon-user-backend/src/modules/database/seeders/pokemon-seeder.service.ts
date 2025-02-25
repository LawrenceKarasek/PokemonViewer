import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';

@Injectable()
export class PokemonSeederService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  async seedPokemon() {
    console.log('🌱 Seeding Pokémon data...');
    for (let id = 1; id <= 151; id++) {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemon = this.pokemonRepository.create({
        name: data.name,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
      });
      await this.pokemonRepository.save(pokemon);
      console.log(`✅ Inserted: ${data.name}`);
    }
    console.log('🎉 Seeding completed!');
  }
}
