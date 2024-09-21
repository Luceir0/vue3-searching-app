<template>
    <!-- Si hay un Pokemon cargado correctamente -->
    <div v-if="pokemonDetail" class="pokemon-detail-container">
        <div class="font-pixel text-4xl capitalize">{{ pokemonDetail.name }}</div>
        <div class="flex items-center justify-center">
            <img :src="pokemonDetail.sprites.front_default || imgNotFound" alt="Front Image" class="w-40 mt-2" />
            <img :src="pokemonDetail.sprites.back_default || imgNotFound" alt="Back Image" class="w-40 mt-2" />
        </div>
        <div class="font-pixel text-xl mt-4">ID: {{ pokemonDetail.id }}</div>
        <div class="font-pixel text-xl mt-4">Base Experience: {{ pokemonDetail.base_experience }}</div>
        <div class="font-pixel text-xl mt-4">Height: {{ pokemonDetail.height }}</div>
        <div class="font-pixel text-xl mt-4">Weight: {{ pokemonDetail.weight }}</div>

        <!-- Abilities -->
        <div class="font-pixel text-2xl mt-6">Abilities:</div>
        <ul class="abilities-list list-inside">
            <li v-for="(ability, index) in pokemonDetail.abilities" :key="index" class="capitalize">
                {{ ability.ability.name }}
            </li>
        </ul>

        <!-- Types -->
        <div class="font-pixel text-2xl mt-6">Types:</div>
        <ul class="type-list list-inside">
            <li v-for="(type, index) in pokemonDetail.types" :key="index" class="capitalize">
                {{ type.type.name }}
            </li>
        </ul>

        <!-- Moves -->
        <div class="font-pixel text-2xl mt-6">Moves:</div>
        <ul class="moves-list list-inside">
            <li v-for="(move, index) in pokemonDetail.moves.slice(0, 10)" :key="index" class="capitalize">
                {{ move.move.name }}
            </li>
        </ul>
    </div>

    <!-- Si estamos en proceso de carga -->
    <div v-else-if="loading" class="flex flex-col gap-10 items-center justify-center">
        <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
    </div>

    <!-- Si ocurrió un error -->
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
import type { PokemonDetail } from '@/interfaces/pokemonInterfaces'

const pokemonStore = usePokemonStore()

// Cambiar el tipo de `pokemonDetail` a `PokemonDetail | null`
const pokemonDetail = ref<PokemonDetail | null>(null)
const loading = ref(true)
const errorMessage = ref<string | null>(null)
const route = useRoute()

onMounted(async () => {
    const pokemonIdOrName = route.params.idOrName as string
    loading.value = true

    // Llamar a la función para obtener el Pokémon
    const result = await pokemonStore.fetchPokemonByIdOrName(pokemonIdOrName)

    if (result) {
        pokemonDetail.value = result
        errorMessage.value = null
    } else {
        errorMessage.value = pokemonStore.selectedPokemonError
    }

    loading.value = false
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