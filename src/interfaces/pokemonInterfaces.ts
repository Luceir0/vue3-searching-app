export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image_front: string;
  image_back: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
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

export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}
