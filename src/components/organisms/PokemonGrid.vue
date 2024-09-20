<template>
    <div class="pokemon-grid-container">
        <div class="font-pixel text-2xl capitalize">
            {{ theType }} Pokémon List
        </div>

        <div v-if="pokemonStore.loading" class="flex items-center justify-center">
            <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
        </div>

        <div v-if="pokemonStore.error" class="text-red-500">{{ pokemonStore.error }}</div>

        <div v-if="!pokemonStore.loading" class="grid grid-cols-1 gap-6 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            <PokemonBasicCard v-if="pokemonStore.pokemons.length > 0" v-for="pokemon in pokemonStore.pokemons"
                :key="pokemon.name" :the-name="pokemon.name" :the-front-img="pokemon.image_front"
                :the-back-img="pokemon.image_back" :the-id="pokemon.id">
            </PokemonBasicCard>
            <div v-else class="font-pixel text-2xl mx-auto">No results</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { usePokemonStore } from "@/stores/pokemon"
import PokemonBasicCard from '@/components/molecules/PokemonBasicCard.vue'
const pokemonStore = usePokemonStore()
import pokeballIcon from '@/assets/icons/pokeball-icon.png'
const theType = ref('All')

const props = defineProps({
    selectedType: {
        type: String,
        default: null
    }
});


onMounted(() => {
    pokemonStore.fetchPokemons()
});

watch(() => props.selectedType, (newType) => {
    if (newType) {
        pokemonStore.fetchPokemonsByType(newType)
        theType.value = newType
    } else {
        pokemonStore.fetchPokemons()
        theType.value = 'All'
    }
})
</script>
