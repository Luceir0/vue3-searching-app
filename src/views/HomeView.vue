<template>
    <div class="container mx-auto">
        <TypeCarousel @type-selected="onTypeSelected"></TypeCarousel>
        <SearchBar></SearchBar>
        <PokemonGrid :selected-type="selectedType"></PokemonGrid>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TypeCarousel from '@/components/organisms/TypeCarousel.vue'
import SearchBar from '@/components/organisms/SearchBar.vue'
import PokemonGrid from '@/components/organisms/PokemonGrid.vue'

const selectedType = ref<string>('')

const onTypeSelected = (type: string) => {
    selectedType.value = type
}

</script>