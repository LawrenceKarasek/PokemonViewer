import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonSeederService } from './pokemon-seeder.service';

@Controller('seed')
export class PokemonSeederController {
  constructor(private readonly seederService: PokemonSeederService) {}

  @Post('pokemon')
  @HttpCode(HttpStatus.OK)
  async seedPokemonData(): Promise<{ message: string }> {
    await this.seederService.seedPokemon();
    return { message: 'Pokémon data seeding completed successfully!' };
  }
}
