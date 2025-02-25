import axios from 'axios';
import { Profile, ProfilePokemon, EditProfilePokemon } from '../types/profile';

const API_ROOT = import.meta.env.VITE_API_URL;

export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined');
    }
    const response = await axios.get<Profile[]>(`${API_ROOT}/profiles`);
    return response.data;
  } catch (e) {
    throw Error(`getAllProfiles error: ${e}`);
  }
};

export const getPokemonByProfile = async (
  profileId: number
): Promise<ProfilePokemon> => {
  const response = await axios.get<ProfilePokemon>(
    `${API_ROOT}/profiles/${profileId}`
  );
  return response.data;
};

export const addPokemonToProfile = async ({
  profileId,
  pokemonId,
}: EditProfilePokemon): Promise<void> => {
  try {
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined');
    }

    const url = `${API_ROOT}/profiles/${profileId}/pokemon/${pokemonId}`;
    await axios.post(url);
  } catch (e) {
    throw Error(`addPokemonToProfile error: ${e}`);
  }
};

export const removePokemonFromProfile = async ({
  profileId,
  pokemonId,
}: EditProfilePokemon): Promise<void> => {
  try {
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined');
    }

    await axios.delete(
      `${API_ROOT}/profiles/${profileId}/pokemon/${pokemonId}`
    );
  } catch (e) {
    throw Error(`removePokemonToProfile error: ${e}`);
  }
};
