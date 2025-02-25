import { Pokemon } from './pokemon';

export interface Profile {
  id: number;
  username: string;
  email: string;
}

export interface ProfilePokemon {
  profileId: number;
  savedPokemon: Pokemon[];
}

export interface ProfileState {
  profiles: Profile[];
  profilePokemon: ProfilePokemon | null;
  loading: boolean;
  error: string | null;
}

export interface EditProfilePokemon {
  profileId: number;
  pokemonId: number;
}
