<template>
    <div class="pokemon-grid-container">
        <div class="font-pixel text-2xl capitalize">
            {{ theType }} Pokémon List
        </div>

        <!-- While app is fetching the results, we show a loading spinner: -->
        <div v-if="pokemonStore.loading" class="flex items-center justify-center">
            <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
        </div>

        <!-- If there's an error, we'll show a message: -->
        <div v-if="pokemonStore.pokemonListError"
            class="text-red-500 font-pixel text-2xl capitalize py-10 flex items-center justify-center">
            {{ pokemonStore.pokemonListError }}
        </div>

        <!-- When fetching is over -->
        <div v-if="!pokemonStore.loading" class="grid grid-cols-1 gap-6 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            <!-- If everything went ok and there are pokemon in the store list, we'll show every fetched pokemon card -->
            <PokemonBasicCard v-if="pokemonStore.pokemonList.length > 0" v-for="pokemon in pokemonStore.pokemonList"
                :key="pokemon.name" :the-name="pokemon.name" :the-front-img="pokemon.image_front || undefined"
                :the-back-img="pokemon.image_back || undefined" :the-id="pokemon.id">
            </PokemonBasicCard>

            <!-- If there were no results, we are showing this message: -->
            <div v-else class="font-pixel text-2xl mx-auto">No results</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { usePokemonStore } from "@/stores/pokemon"
import PokemonBasicCard from '@/components/molecules/PokemonBasicCard.vue'
import pokeballIcon from '@/assets/icons/pokeball-icon.png'

// Pinia store to get all saved pokemon data:
const pokemonStore = usePokemonStore()
const theType = ref<string>('All')

const props = defineProps({
    selectedType: {
        type: String,
        default: null,
    }
});

// Fetching pokemon list on mount
onMounted(() => {
    pokemonStore.fetchPokemons()
});

// Watch for type selection changes, and fetching accordingly:
watch(() => props.selectedType, (newType) => {
    console.log(newType)
    if (newType && newType !== 'all') {
        pokemonStore.fetchPokemonsByType(newType)
        theType.value = newType
    } else {
        pokemonStore.fetchPokemons()
        theType.value = 'All'
    }
})
</script>