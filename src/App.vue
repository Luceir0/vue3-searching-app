<template>
  <!-- Will be in the entire app -->
  <Header></Header>
  <!-- Will show the specific route -->
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/Header.vue'
import { RouterView } from 'vue-router'
</script>
