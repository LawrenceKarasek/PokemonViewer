import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EditProfilePokemon, ProfileState } from '../types/profile';
import {
  getAllProfiles,
  getPokemonByProfile,
  addPokemonToProfile,
  removePokemonFromProfile,
} from '../data/profile';

const initialState: ProfileState = {
  profiles: [],
  profilePokemon: null,
  loading: false,
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  'profile/fetchProfiles',
  getAllProfiles
);
export const fetchPokemonByProfile = createAsyncThunk(
  'profile/fetchPokemonByProfile',
  getPokemonByProfile
);
export const addPokemon = createAsyncThunk(
  'profile/addPokemon',
  async (params: EditProfilePokemon) => addPokemonToProfile(params)
);
export const removePokemon = createAsyncThunk(
  'profile/removePokemon',
  async (params: EditProfilePokemon) => removePokemonFromProfile(params)
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(fetchPokemonByProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonByProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profilePokemon = action.payload;
      })
      .addCase(fetchPokemonByProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(addPokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPokemon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(removePokemon.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePokemon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      });
  },
});

export default profileSlice.reducer;
