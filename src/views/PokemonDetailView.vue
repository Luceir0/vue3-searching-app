<template>
    <div v-if="pokemon" class="pokemon-detail-container">
        <div class="font-pixel text-4xl capitalize">{{ pokemon.name }}</div>
        <div class="flex items-center justify-center">
            <img :src="pokemon.sprites.front_default" alt="Front Image" class="w-40 h-40 mt-2" />
            <img :src="pokemon.sprites.back_default" alt="Back Image" class="w-40 h-40 mt-2" />
        </div>
        <div class="font-pixel text-xl mt-4">ID: {{ pokemon.id }}</div>
        <div class="font-pixel text-xl mt-4">Base Experience: {{ pokemon.base_experience }}</div>
        <div class="font-pixel text-xl mt-4">Height: {{ pokemon.height }}</div>
        <div class="font-pixel text-xl mt-4">Weight: {{ pokemon.weight }}</div>

        <!-- Abilities -->
        <div class="font-pixel text-2xl mt-6">Abilities:</div>
        <ul class="abilities-list list-inside">
            <li v-for="(ability, index) in pokemon.abilities" :key="index" class="capitalize">
                {{ ability.ability.name }}
            </li>
        </ul>

        <!-- Types -->
        <div class="font-pixel text-2xl mt-6">Types:</div>
        <ul class="type-list list-inside">
            <li v-for="(type, index) in pokemon.types" :key="index" class="capitalize">
                {{ type.type.name }}
            </li>
        </ul>

        <!-- Moves -->
        <div class="font-pixel text-2xl mt-6">Moves:</div>
        <ul class="moves-list list-inside">
            <li v-for="(move, index) in pokemon.moves.slice(0, 10)" :key="index" class="capitalize">
                {{ move.move.name }}
            </li>
        </ul>
    </div>

    <div v-else class="flex items-center justify-center">
        <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { PokemonDetail } from '@/interfaces/pokemonInterfaces'
import pokeballIcon from '@/assets/icons/pokeball-icon.png'


const route = useRoute();
const pokemon = ref<PokemonDetail | null>(null);

onMounted(async () => {
    const pokemonId = route.params.id as string;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    pokemon.value = await response.json();
});
</script>

<style scoped>
.abilities-list li::marker {
    content: "✨";
    font-size: 1rem;
}

.moves-list li::marker {
    content: "💢";
    font-size: 1rem;
}

.type-list li::marker {
    content: "🧬";
    font-size: 1rem;
}
</style>