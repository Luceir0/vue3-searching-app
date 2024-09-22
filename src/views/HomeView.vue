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

const selectedType = ref<string>('all') // Valor por defecto
const route = useRoute()

// Captura el tipo desde la query string cuando el componente se monta
onMounted(() => {
    if (route.query.type) {
        selectedType.value = route.query.type as string
    }
})

// Observa cambios en la ruta, por si el usuario regresa o navega a la página home desde otra página
watch(() => route.query.type, (newType) => {
    selectedType.value = newType as string || 'all'
})

const onTypeSelected = (type: string) => {
    selectedType.value = type
}

</script>