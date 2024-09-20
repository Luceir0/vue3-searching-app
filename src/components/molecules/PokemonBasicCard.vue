<template>
    <div
        class="pokemon-card border border-white bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer group overflow-hidden shadow-lg">
        <div class="flex items-center justify-center group-hover:scale-110 transition ease-in-out duration-300">
            <img :src="props.theFrontImg" alt="Front Image" class="w-40 h-40 mt-2">
            <img :src="props.theBackImg" alt="Back Image" class="w-40 h-40 mt-2">
        </div>

        <div
            class="font-pixel text-2xl capitalize group-hover:text-white group-hover:scale-110 transition ease-in-out duration-300 py-2 text-white">
            #{{ props.theId }} - {{ props.theName }}
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    theName: {
        type: String,
        required: true,
    },
    theId: {
        type: Number,
        required: true,
    },
    theFrontImg: {
        type: String,
        required: true,
    },
    theBackImg: {
        type: String,
        required: true,
    },
});

</script>
