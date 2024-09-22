import { defineStore } from "pinia";
// Importing interfaces:
import type {
  Pokemon,
  PokemonDetail,
  PokemonState,
} from "@/interfaces/pokemonInterfaces";

export const usePokemonStore = defineStore("pokemon", {
  // We're here setting an initial store state with the data we're using all along the app
  state: (): PokemonState => ({
    pokemonList: [],
    pokemonListError: null,
    selectedPokemon: null,
    selectedPokemonError: null,
    loading: false,
    currentOffset: 0,
    limit: 151,
  }),
  // Those are the endpoints we're calling from every component:
  actions: {
    // Here, we're using this function to fetch all pokemons:
    async fetchPokemons(forceReload: boolean = false, offset: number = 0) {
      // We're verifying if there's a cached pokemonList. We're here perventing the call to be made if we already have data at pokemonList array from the state object:
      if (
        this.pokemonList.length > 0 &&
        !forceReload &&
        offset === this.currentOffset
      ) {
        return;
      }

      this.loading = true;
      this.pokemonListError = null;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`
        );
        const data = await response.json();

        // In a first result, we're getting only two keys: namd and url.
        // With this url, we're getting some more data to show at the pokemonGrid (like id and front and back images)
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

        // If we are sending an offset bigger than 0, we concatenate those new results to the previous pokemonList:
        if (offset > 0) {
          this.pokemonList = [
            ...this.pokemonList,
            ...(await Promise.all(promises)),
          ];
        } else {
          // If not, we are overwritting this pokemonList:
          this.pokemonList = await Promise.all(promises);
        }

        // Also, we should update the current offSet:
        this.currentOffset = offset;
      } catch (error: any) {
        // If there were an error, we are sending it to the store:
        this.pokemonListError = "Pokemon not found";
      } finally {
        // Finally, the api call is done
        this.loading = false;
      }
    },

    // Here, we're using this function to fetch pokemons by type:
    async fetchPokemonsByType(type: string) {
      // We're making sure the app has a loading state
      this.loading = true;
      // And we're making sure there's no an error showing at this time
      this.pokemonListError = null;

      // This call is very similar to the previous one, with a different endpoint:
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

    // In this case we are fetching pokemon by id or name:
    async fetchPokemonByIdOrName(
      idOrName: string
    ): Promise<PokemonDetail | null> {
      // we're starting checking if there's a pokemon cached at the state
      if (
        this.selectedPokemon?.name === idOrName ||
        this.selectedPokemon?.id === Number(idOrName)
      ) {
        return this.selectedPokemon; // If there's already a pokemon, we're showing it
      }

      this.loading = true;
      this.selectedPokemonError = null;

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${idOrName}`
        );

        const pokemonDetail: PokemonDetail = await response.json();

        // We're formatting the PokemonDetail to get only the data we're using it at the template:
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

        // We're caching the selectedPokemon
        this.selectedPokemon = formattedPokemonDetail;

        // And returning the formattedDetail
        return formattedPokemonDetail;
      } catch (error: any) {
        // Handling errors
        this.selectedPokemonError = "Pokemon not found";
        this.selectedPokemon = null;
        return null;
      } finally {
        // Loading is done
        this.loading = false;
      }
    },
  },
});
