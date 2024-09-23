<template>
    <div class="carousel-container py-5">
        <div class="font-pixel text-2xl text-white">
            Filter by type
        </div>
        <div class="flex items-center gap-4 w-100 overflow-x-auto scrollbar-hide py-4">
            <!-- We're getting all the pokemon types from the interface and showing them in small cards -->
            <TypeCard v-for="(item, index) in pokemonTypes" :key="index" :the-type="item.name" :the-img="item.image"
                @select-type="filterByType" data-test-id="type-card">
            </TypeCard>
        </div>
    </div>

</template>

<script setup lang="ts">
import TypeCard from '@/components/molecules/TypeCard.vue'
import { pokemonTypes } from '@/interfaces/pokemonTypes'
import { useRouter } from 'vue-router'

const router = useRouter()

// On click, we're emitting the new type to the homepage to make a new api call to get a filtered pokemon list and showing it
const emit = defineEmits(['type-selected'])

// We're 'faking*' a navigation at the url 
// *since this is a SPA
const filterByType = (type: string) => {
    emit('type-selected', type)
    if (type != 'all') {
        router.push({ query: { type: type } })
    } else {
        router.push('/')
    }
}
</script>

<style>
::-webkit-scrollbar {
    display: none;
}

@media (min-width: 1024px) {
    ::-webkit-scrollbar {
        display: block;
    }
}
</style>