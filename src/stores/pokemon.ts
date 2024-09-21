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
    currentOffset: 0, // Estado para almacenar el offset actual
    limit: 151, // Límite por defecto
  }),
  actions: {
    async fetchPokemons(forceReload: boolean = false, offset: number = 0) {
      // Verificando si hay una lista de Pokemons cacheada
      if (
        this.pokemonList.length > 0 &&
        !forceReload &&
        offset === this.currentOffset
      ) {
        return; // Evitar llamada si ya están cacheados y no se fuerza la recarga
      }

      this.loading = true;
      this.pokemonListError = null;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`
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
              image_front: pokemonDetails.sprites.front_default || null,
              image_back: pokemonDetails.sprites.back_default || null,
            } as Pokemon;
          }
        );

        // Si el offset es mayor a 0, concatenamos los nuevos resultados a la lista
        if (offset > 0) {
          this.pokemonList = [
            ...this.pokemonList,
            ...(await Promise.all(promises)),
          ];
        } else {
          // Si es el primer grupo, sobrescribimos la lista
          this.pokemonList = await Promise.all(promises);
        }

        // Actualizamos el offset actual
        this.currentOffset = offset;
      } catch (error: any) {
        this.pokemonListError = "Pokemon not found";
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonsByType(type: string) {
      this.loading = true;
      this.pokemonListError = null;
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
            image_front: pokemonDetails.sprites.front_default || null,
            image_back: pokemonDetails.sprites.back_default || null,
          } as Pokemon;
        });

        this.pokemonList = await Promise.all(promises);
      } catch (error: any) {
        this.pokemonListError = "Pokemon not found";
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
        this.selectedPokemonError = "Pokemon not found";
        this.selectedPokemon = null;
      } finally {
        this.loading = false;
      }
    },
  },
});
