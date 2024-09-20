<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/Header.vue'

import { RouterView } from 'vue-router'
</script>
