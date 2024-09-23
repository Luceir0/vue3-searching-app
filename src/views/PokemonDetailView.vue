<template>
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <!-- If we get a pokemon detail we'll show it to the user -->
        <div v-if="pokemonDetail"
            class="flex-grow flex flex-col lg:flex-row items-top lg:items-top lg:mt-6 2xl:mt-24 justify-around lg:gap-20">
            <div class="mt-8 lg:mt-0">
                <div class="flex items-center justify-between px-4 py-2 lg:pb-2 lg:pt-0 -mt-10 lg:mt-0">
                    <div class="font-pixel text-4xl capitalize truncate">{{ pokemonDetail.name }}</div>
                    <div class="font-pixel text-3xl"># {{ pokemonDetail.id }}</div>
                </div>
                <div class="flex items-center justify-center">
                    <img :src="pokemonDetail.sprites.front_default || imgNotFound" alt="Front Image"
                        class="w-28 lg:w-40 mt-2" />
                    <img :src="pokemonDetail.sprites.back_default || imgNotFound" alt="Back Image"
                        class="w-28 lg:w-40 mt-2" />
                </div>

                <div class="mt-4 flex flex-col gap-2">
                    <div v-for="(type, index) in pokemonDetail.types.slice(0, 2)" :key="index" class="capitalize">
                        <TypeCard :the-type="type.type.name" :the-img="getTypeImage(type.type.name)"
                            @click="sendMeHomeAndFilter(type.type.name)">
                        </TypeCard>
                    </div>
                </div>
            </div>

            <!-- This is showing the pokemon detail data card with all the content we're passing by props -->
            <PokemonInfo :pokemon-detail="pokemonDetail"
                class="fixed bottom-0 h-2/5 lg:static lg:bottom-auto lg:flex-grow">
            </PokemonInfo>
        </div>

        <!-- While api call is not finished, we're showing a spinner -->
        <div v-else-if="pokemonStore.loading" class="flex flex-col gap-10 items-center justify-center">
            <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
        </div>

    </div>
    <!-- If there's an error, we are showing a not found message, and we're helping the user return home -->
    <div v-if="errorMessage" class="flex flex-col gap-4 items-center justify-center py-8">
        <img class="w-40" :src="notFoundIcon" alt="Not found">
        <div class="font-pixel text-2xl text-pokemon-yellow">{{ errorMessage }}</div>
        <router-link to="/"
            class="flex gap-4 mt-10 align-middle bg-zinc-800 justify-center hover:text-white hover:-translate-x-1 transition ease-in-out duration-300 cursor-pointer text-lg border rounded-md px-4 py-2">
            Return home 🏠
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PokemonDetail } from '@/interfaces/pokemonInterfaces'
import { usePokemonStore } from '@/stores/pokemon'
import { pokemonTypes } from '@/interfaces/pokemonTypes'
import pokeballIcon from '@/assets/icons/pokeball-icon.png'
import notFoundIcon from '@/assets/icons/not-found.png'
import defaultBackground from '@/assets/backgrounds/all_type.jpg'
import imgNotFound from '@/assets/icons/img-not-found.png'
import TypeCard from '@/components/molecules/TypeCard.vue'
import PokemonInfo from '@/components/organisms/PokemonInfo.vue'


const pokemonStore = usePokemonStore()
const pokemonDetail = ref<PokemonDetail | null>(null)
const errorMessage = ref<string | null>(null)
const route = useRoute()
const router = useRouter()

// On mounted, we are getting the idOrName param from the url, and calling the fetchPokemonByIdOrName endpoint from the pokemon store.
// When and if we get a result, we are showing it at the template. If not, we're showing a not found message.
onMounted(async () => {
    const pokemonIdOrName = route.params.idOrName as string

    const result = await pokemonStore.fetchPokemonByIdOrName(pokemonIdOrName)

    if (result) {
        pokemonDetail.value = result
        errorMessage.value = null
    } else {
        errorMessage.value = pokemonStore.selectedPokemonError
    }

})

// We are getting the type background images from the pokemonTypes interface, and depending on the pokemon type we get from the api call
const getTypeImage = (typeName: string) => {
    const type = pokemonTypes.find(t => t.name === typeName.toLowerCase());
    return type ? type.image : defaultBackground;
}

// If user selects a pokemon type, app is redirecting to homeView and showinf the user the filtered list of the pokemon (depending on the selected value) 
// This will make an api call at homeView
const sendMeHomeAndFilter = (type: string) => {
    router.push({ path: '/', query: { type: type } });
};
</script>