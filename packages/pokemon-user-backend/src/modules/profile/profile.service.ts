import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../database/entities/profile.entity';
import { Pokemon } from '../database/entities/pokemon.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  async createProfile(username: string, email: string): Promise<Profile> {
    const profile = this.profileRepository.create({ username, email });
    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async addPokemonToProfile(
    profileId: number,
    pokemonId: number
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['savedPokemon'],
    });

    if (profile.savedPokemon.length === 6) {
      throw new Error('A maximimum of 6 pokemon can be selected per profile');
    }

    const pokemon = await this.pokemonRepository.findOne({
      where: { id: pokemonId },
    });

    if (!pokemon) throw new Error('Pokémon not found');
    if (!profile) throw new Error('Profile not found');

    profile.savedPokemon.push(pokemon);
    return this.profileRepository.save(profile);
  }

  async removePokemonFromProfile(
    profileId: number,
    pokemonId: number
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['savedPokemon'],
    });

    if (!profile) throw new Error('Profile not found');

    await this.profileRepository
      .createQueryBuilder()
      .relation(Profile, 'savedPokemon')
      .of(profileId)
      .remove(pokemonId);

    return this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['savedPokemon'],
    });
  }

  async getProfileWithPokemon(profileId: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id: profileId },
      relations: ['savedPokemon'],
    });
  }
}
