<template>
  <div class="container mx-auto">
    <Header></Header>
    <TypeCarousel></TypeCarousel>
    <SearchBar></SearchBar>
    <PokemonGrid></PokemonGrid>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/Header.vue'
import TypeCarousel from '@/components/organisms/TypeCarousel.vue'
import SearchBar from '@/components/organisms/SearchBar.vue'
import PokemonGrid from '@/components/organisms/PokemonGrid.vue'

</script>

<style scoped>
@media (min-width: 1024px) {}
</style>
