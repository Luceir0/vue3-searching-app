<template>
    <div class="container mx-auto">
        <TypeCarousel @type-selected="onTypeSelected"></TypeCarousel>
        <SearchBar></SearchBar>
        <PokemonGrid :selected-type="selectedType"></PokemonGrid>
        <GoTopButton></GoTopButton>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TypeCarousel from '@/components/organisms/TypeCarousel.vue'
import SearchBar from '@/components/organisms/SearchBar.vue'
import PokemonGrid from '@/components/organisms/PokemonGrid.vue'
import GoTopButton from '@/components/molecules/GoTopButton.vue'

const selectedType = ref<string>('all')
const route = useRoute()

// Capturing the pokemon type from the query string when the component is mounted:
onMounted(() => {
    if (route.query.type) {
        selectedType.value = route.query.type as string
    }
})

// Watching for any changes at the route query string, if user returns to the home page from another route.
// We need this when user returns selecting a type from the pokemon detail page.
watch(() => route.query.type, (newType) => {
    selectedType.value = newType as string || 'all'
})

// This function is called when a type is selected from the TypeCarousel component. This is changing the selectedType value and sending it to the pokemonGrid. 
// It will make a new api call and manage the new content
const onTypeSelected = (type: string) => {
    selectedType.value = type
}

</script>