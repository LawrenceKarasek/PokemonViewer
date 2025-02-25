import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Pokemon } from '../types/pokemon';
import { getAllPokemon } from '../data/pokemon';

interface PokemonState {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemon: [],
  loading: false,
  error: null,
};

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  getAllPokemon
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default pokemonSlice.reducer;
