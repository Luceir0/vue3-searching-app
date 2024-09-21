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

    async fetchPokemonByIdOrName(
      idOrName: string
    ): Promise<PokemonDetail | null> {
      // Comprobando si el Pokémon ya está en caché
      if (
        this.selectedPokemon?.name === idOrName ||
        this.selectedPokemon?.id === Number(idOrName)
      ) {
        return this.selectedPokemon; // Si el Pokémon ya está cacheado, lo devolvemos directamente
      }

      this.loading = true;
      this.selectedPokemonError = null;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${idOrName}`
        );

        // Comprobar si la respuesta es válida
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }

        // Parseamos la respuesta en formato JSON
        const pokemonDetail: PokemonDetail = await response.json();

        // Formateamos el objeto para devolver solo los datos necesarios
        const formattedPokemonDetail: PokemonDetail = {
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          base_experience: pokemonDetail.base_experience,
          height: pokemonDetail.height,
          weight: pokemonDetail.weight,
          sprites: {
            front_default: pokemonDetail.sprites.front_default || null,
            back_default: pokemonDetail.sprites.back_default || null,
          },
          abilities: pokemonDetail.abilities.map((abilityData) => ({
            ability: {
              name: abilityData.ability.name,
            },
          })),
          types: pokemonDetail.types.map((typeData) => ({
            type: {
              name: typeData.type.name,
            },
          })),
          moves: pokemonDetail.moves.map((moveData) => ({
            move: {
              name: moveData.move.name,
            },
          })),
        };

        // Cacheamos el Pokémon seleccionado
        this.selectedPokemon = formattedPokemonDetail;

        // Devolvemos el detalle del Pokémon
        return formattedPokemonDetail;
      } catch (error: any) {
        // Manejo de errores
        this.selectedPokemonError = "Pokemon not found";
        this.selectedPokemon = null;
        return null; // Devolver null si hay error
      } finally {
        // Detener el estado de carga
        this.loading = false;
      }
    },
  },
});
