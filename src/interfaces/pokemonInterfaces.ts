export interface PokemonState {
  pokemonList: Pokemon[];
  pokemonListError: string | null;
  selectedPokemon: PokemonDetail | null;
  selectedPokemonError: string | null;
  loading: boolean;
}

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image_front: string | null;
  image_back: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    back_default: string | null;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}
