import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from '../database/entities/profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(@Body() body: { username: string; email: string }) {
    return this.profileService.createProfile(body.username, body.email);
  }

  @Post(':profileId/pokemon/:pokemonId')
  async addPokemon(
    @Param('profileId') profileId: number,
    @Param('pokemonId') pokemonId: number
  ) {
    return this.profileService.addPokemonToProfile(profileId, pokemonId);
  }

  @Delete(':profileId/pokemon/:pokemonId')
  async removePokemon(
    @Param('profileId') profileId: number,
    @Param('pokemonId') pokemonId: number
  ) {
    return this.profileService.removePokemonFromProfile(profileId, pokemonId);
  }

  @Get()
  async getAllProfiles(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':profileId')
  async getProfile(@Param('profileId') profileId: number) {
    return this.profileService.getProfileWithPokemon(profileId);
  }
}
