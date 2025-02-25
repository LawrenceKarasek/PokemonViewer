import axios from 'axios';
import { Pokemon } from '../types/pokemon';

const API_ROOT = import.meta.env.VITE_API_URL;

export const getAllPokemon = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get<Pokemon[]>(`${API_ROOT}/pokemon`);
    return response.data;
  } catch (e) {
    throw Error(`getAllPokemon error: ${e}`);
  }
};
