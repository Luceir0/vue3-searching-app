<template>
    <div v-if="pokemonStore.selectedPokemon" class="pokemon-detail-container">
        <div class="font-pixel text-4xl capitalize">{{ pokemonStore.selectedPokemon.name }}</div>
        <div class="flex items-center justify-center">
            <img :src="pokemonStore.selectedPokemon.sprites.front_default || imgNotFound" alt="Front Image"
                class="w-40 mt-2" />
            <img :src="pokemonStore.selectedPokemon.sprites.back_default || imgNotFound" alt="Back Image"
                class="w-40 mt-2" />
        </div>
        <div class="font-pixel text-xl mt-4">ID: {{ pokemonStore.selectedPokemon.id }}</div>
        <div class="font-pixel text-xl mt-4">Base Experience: {{ pokemonStore.selectedPokemon.base_experience }}</div>
        <div class="font-pixel text-xl mt-4">Height: {{ pokemonStore.selectedPokemon.height }}</div>
        <div class="font-pixel text-xl mt-4">Weight: {{ pokemonStore.selectedPokemon.weight }}</div>

        <!-- Abilities -->
        <div class="font-pixel text-2xl mt-6">Abilities:</div>
        <ul class="abilities-list list-inside">
            <li v-for="(ability, index) in pokemonStore.selectedPokemon.abilities" :key="index" class="capitalize">
                {{ ability.ability.name }}
            </li>
        </ul>

        <!-- Types -->
        <div class="font-pixel text-2xl mt-6">Types:</div>
        <ul class="type-list list-inside">
            <li v-for="(type, index) in pokemonStore.selectedPokemon.types" :key="index" class="capitalize">
                {{ type.type.name }}
            </li>
        </ul>

        <!-- Moves -->
        <div class="font-pixel text-2xl mt-6">Moves:</div>
        <ul class="moves-list list-inside">
            <li v-for="(move, index) in pokemonStore.selectedPokemon.moves.slice(0, 10)" :key="index"
                class="capitalize">
                {{ move.move.name }}
            </li>
        </ul>
    </div>

    <div v-else-if="pokemonStore.loading" class="flex flex-col gap-10 items-center justify-center">
        <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
    </div>

    <div v-else class="flex flex-col gap-4 items-center justify-center py-8">
        <img class="w-40" :src="notFoundIcon" alt="Not found">
        <div class="font-pixel text-2xl text-pokemon-yellow">
            {{ errorMessage }}
        </div>
        <router-link to="/"
            class="flex gap-4 mt-10 align-middle bg-zinc-800 justify-center hover:text-white hover:-translate-x-1 transition ease-in-out duration-300 cursor-pointer text-lg border rounded-md px-4 py-2">
            Return home 🏠
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import pokeballIcon from '@/assets/icons/pokeball-icon.png'
import notFoundIcon from '@/assets/icons/not-found.png'
import imgNotFound from '@/assets/icons/img-not-found.png'

const route = useRoute()
const pokemonStore = usePokemonStore()
const errorMessage = ref<string | null>(null)

onMounted(async () => {
    const pokemonIdOrName = route.params.idOrName as string
    await pokemonStore.fetchPokemonByIdOrName(pokemonIdOrName)
    if (pokemonStore.selectedPokemonError) {
        errorMessage.value = pokemonStore.selectedPokemonError
    } else {
        errorMessage.value = null
    }
})
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