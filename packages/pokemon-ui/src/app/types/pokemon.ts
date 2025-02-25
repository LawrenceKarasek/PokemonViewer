export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  type: string;
  abilities: string;
  habitat: string;
}

export interface PokemonListProps {
  selectedProfileId: number;
}
