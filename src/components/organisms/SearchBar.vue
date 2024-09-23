<template>
    <div class="searchbar-container py-5">
        <div class="font-pixel text-2xl text-white">
            Search by name
        </div>
        <div class="relative flex flex-col lg:flex-row items-center justify-center gap-2 lg:w-1/2 mx-auto py-5">
            <img src="@/assets/icons/search-icon.png" alt="Search" class="absolute left-4 top-8 h-6 w-6">
            <input type="text" v-model="searchQuery" placeholder="Write here a Pokemon name or ID"
                class="text-black rounded-3xl h-12 lg:h-10 w-full pl-12" @keyup.enter="onSearchClick">
            <!-- With this @keyup.enter="onSearchClick" we're letting the user press enter to start searching -->
            <button @click="onSearchClick"
                class="bg-pokemon-yellow hover:animate-pulse text-black text-lg rounded-full mt-2 lg:mt-0 px-8 py-2 lg:p-2 font-bold cursor-pointer">
                Go!
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const searchQuery = ref<string>('')

// We're making the app navigate to pokemonDetails and send the url some params to get those details with an api call
const onSearchClick = () => {
    if (searchQuery.value) {
        router.push({ name: 'PokemonDetails', params: { idOrName: searchQuery.value.trim().toLowerCase() } })
    }
}
</script>