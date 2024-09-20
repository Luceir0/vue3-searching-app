export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image_front: string;
  image_back: string;
}

export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}
