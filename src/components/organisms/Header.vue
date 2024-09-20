<template>
    <div class="flex items-center justify-center pb-5">
        <img :src="pkmnIcon" alt="pokemon" class="w-1/2 lg:w-1/6">
    </div>
</template>

<script setup lang="ts">
import pkmnIcon from '@/assets/icons/pokemon-icon.svg'
</script>