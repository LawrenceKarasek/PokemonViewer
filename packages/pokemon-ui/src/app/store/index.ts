import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import pokemonReducer from './pokemonSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
