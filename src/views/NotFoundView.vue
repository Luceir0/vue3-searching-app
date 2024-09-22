<template>
    <div class="flex flex-col gap-4 items-center justify-center py-8">
        <div class="font-pixel text-4xl text-pokemon-yellow">404</div>

        <img class="w-40" :src="notFoundIcon" alt="Not found">
        <div class="font-pixel text-2xl text-pokemon-yellow">Lost? We got you covered</div>
        <router-link to="/"
            class="flex gap-4 mt-2 align-middle bg-zinc-800 justify-center hover:text-white hover:-translate-x-1 transition ease-in-out duration-300 cursor-pointer text-lg border rounded-md px-4 py-2">
            Return home 🏠
        </router-link>
    </div>
</template>

<script setup lang="ts">
import notFoundIcon from '@/assets/icons/not-found.png'

</script>