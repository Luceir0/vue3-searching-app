import { defineStore } from "pinia";
import type { Pokemon, PokemonState } from "@/interfaces/pokemonInterfaces";

export const usePokemonStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemons: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPokemons() {
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

        this.pokemons = await Promise.all(promises);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
