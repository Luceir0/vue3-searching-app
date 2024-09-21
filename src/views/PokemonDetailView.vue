<template>
    <div class="flex flex-col">
        <div v-if="pokemonDetail" class="flex-grow flex flex-col lg:flex-row items-top justify-around">
            <div class="mt-8">
                <div class="flex items-center justify-between px-4 py-2">
                    <div class="font-pixel text-4xl capitalize truncate">{{ pokemonDetail.name }}</div>
                    <div class="font-pixel text-3xl"># {{ pokemonDetail.id }}</div>
                </div>
                <div class="flex items-center justify-center">
                    <img :src="pokemonDetail.sprites.front_default || imgNotFound" alt="Front Image"
                        class="w-40 mt-2" />
                    <img :src="pokemonDetail.sprites.back_default || imgNotFound" alt="Back Image" class="w-40 mt-2" />
                </div>

                <div class="mt-4 flex flex-col gap-2">
                    <div v-for="(type, index) in pokemonDetail.types.slice(0, 2)" :key="index" class="capitalize">
                        <TypeCard :the-type="type.type.name" :the-img="getTypeImage(type.type.name)">
                        </TypeCard>
                    </div>
                </div>


            </div>

            <PokemonInfo :pokemon-detail="pokemonDetail" class="fixed bottom-0 h-2/5"></PokemonInfo>
        </div>

        <div v-else-if="loading" class="flex flex-col gap-10 items-center justify-center">
            <img class="animate-spin w-12 h-auto mt-12" :src="pokeballIcon" alt="Loading...">
        </div>

        <div v-else class="flex flex-col gap-4 items-center justify-center py-8">
            <img class="w-40" :src="notFoundIcon" alt="Not found">
            <div class="font-pixel text-2xl text-pokemon-yellow">{{ errorMessage }}</div>
            <router-link to="/"
                class="flex gap-4 mt-10 align-middle bg-zinc-800 justify-center hover:text-white hover:-translate-x-1 transition ease-in-out duration-300 cursor-pointer text-lg border rounded-md px-4 py-2">
                Return home 🏠
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
const loading = ref(true)
const errorMessage = ref<string | null>(null)
const route = useRoute()

onMounted(async () => {
    const pokemonIdOrName = route.params.idOrName as string
    loading.value = true

    const result = await pokemonStore.fetchPokemonByIdOrName(pokemonIdOrName)

    if (result) {
        pokemonDetail.value = result
        errorMessage.value = null
    } else {
        errorMessage.value = pokemonStore.selectedPokemonError
    }

    loading.value = false
})

const getTypeImage = (typeName: string) => {
    const type = pokemonTypes.find(t => t.name === typeName.toLowerCase());
    return type ? type.image : defaultBackground;
}
</script>