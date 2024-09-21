<template>
    <div class="carousel-container py-5">
        <div class="font-pixel text-2xl text-white">
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
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['type-selected'])

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