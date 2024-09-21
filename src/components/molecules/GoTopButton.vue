<template>
    <button v-show="isScrolled" @click="scrollToTop"
        class="fixed bottom-4 right-4 bg-pokemon-green hover:bg-pokemon-yellow lg:hover:animate-pulse transition ease-in-out duration-300 text-black font-bold py-2 px-4 rounded">
        ▲
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isScrolled = ref(false);

onMounted(() => {
    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 100;
    });
});

const scrollToTop = () => {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
};
</script>
