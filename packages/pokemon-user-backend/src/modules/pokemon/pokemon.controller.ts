import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../database/entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }
}
