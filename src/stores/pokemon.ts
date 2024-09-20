import { defineStore } from "pinia";
import type {
  Pokemon,
  PokemonDetail,
  PokemonState,
} from "@/interfaces/pokemonInterfaces";

export const usePokemonStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemonList: [],
    pokemonListError: null,
    selectedPokemon: null,
    selectedPokemonError: null,
    loading: false,
  }),
  actions: {
    async fetchPokemons() {
      // Verificando si hay una lista de Pokemons cacheada
      if (this.pokemonList.length > 0) {
        return; // Si hay Pokemon en caché, se evita la llamada
      }

      this.loading = true;
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();

        const promises = data.results.map(
          async (pokemon: { name: string; url: string }) => {
            const pokemonDetailsResponse = await fetch(pokemon.url);
            const pokemonDetails = await pokemonDetailsResponse.json();

            return {
              name: pokemonDetails.name,
              url: pokemon.url,
              id: pokemonDetails.id,
              image_front: pokemonDetails.sprites.front_default,
              image_back: pokemonDetails.sprites.back_default,
            } as Pokemon;
          }
        );

        this.pokemonList = await Promise.all(promises);
      } catch (error: any) {
        this.pokemonListError = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonsByType(type: string) {
      this.loading = true;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();

        const promises = data.pokemon.map(async (pokeData: any) => {
          const pokemonDetailsResponse = await fetch(pokeData.pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();

          return {
            name: pokemonDetails.name,
            url: pokeData.pokemon.url,
            id: pokemonDetails.id,
            image_front: pokemonDetails.sprites.front_default,
            image_back: pokemonDetails.sprites.back_default,
          } as Pokemon;
        });

        this.pokemonList = await Promise.all(promises);
      } catch (error: any) {
        this.pokemonListError = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonByIdOrName(idOrName: string) {
      if (
        this.selectedPokemon?.name === idOrName ||
        this.selectedPokemon?.id === Number(idOrName)
      ) {
        return; // Comprobando si hay un selectedPokemon en caché. Si lo hay, evitamos la llamada
      }

      this.loading = true;
      this.selectedPokemonError = null;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${idOrName}`
        );
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const pokemonDetail: PokemonDetail = await response.json();
        this.selectedPokemon = pokemonDetail; // Cacheando el Pokemon
      } catch (error: any) {
        this.selectedPokemonError = error.message;
        this.selectedPokemon = null;
      } finally {
        this.loading = false;
      }
    },
  },
});
