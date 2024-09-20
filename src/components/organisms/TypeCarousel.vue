<template>
    <div class="carousel-container py-5">
        <div class="font-pixel text-2xl">
            Filter by type
        </div>
        <div class="flex items-center gap-4 w-100 overflow-x-auto scrollbar-hide py-4">
            <TypeCard v-for="(item, index) in pokemonTypes" :key="index" :the-type="item.name" :the-img="item.image"
                @select-type="filterByType">
            </TypeCard>
        </div>
    </div>

</template>

<script setup lang="ts">
import TypeCard from '@/components/molecules/TypeCard.vue'
import { pokemonTypes } from '@/interfaces/pokemonTypes'

const emit = defineEmits(['type-selected'])

const filterByType = (type: string) => {
    emit('type-selected', type)
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