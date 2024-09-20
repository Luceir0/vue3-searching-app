<template>
    <div class="pokemon-grid-container">
        <div class="font-pixel text-2xl">
            Pokémon List
        </div>

        <div v-if="pokemonStore.loading" class="flex items-center justify-center">
            <img class="animate-spin w-28 h-auto mt-10" :src="pokeballIcon" alt="Loading...">
        </div>

        <div v-if="pokemonStore.error" class="text-red-500">{{ pokemonStore.error }}</div>

        <ul v-if="!pokemonStore.loading">
            <li v-if="pokemonStore.pokemons.length > 0" v-for="pokemon in pokemonStore.pokemons" :key="pokemon.name">
                {{ pokemon.name }}
                {{ pokemon.url }}
                <img :src="pokemon.image_front" alt="">
                <img :src="pokemon.image_back" alt="">
            </li>
            <li v-else>No results</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import pokeballIcon from '@/assets/icons/pokeball-icon.png'
import { onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemon";

const pokemonStore = usePokemonStore();

onMounted(() => {
    pokemonStore.fetchPokemons();
});
</script>
