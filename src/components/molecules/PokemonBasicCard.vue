<template>
    <!-- redirecting the user to the detail url -->
    <router-link :to="'/pokemon/' + props.theId" class="pokemon-card-link" data-test-id="pokemon-card-link">
        <div
            class="bg-white/5 hover:bg-white/10 transition ease-in-out duration-500 rounded-lg p-2 lg:p-4 flex lg:flex-col items-center justify-between gap-4 cursor-pointer group overflow-hidden">
            <div
                class="flex flex-col lg:flex-row items-center justify-center group-hover:scale-110 transition ease-in-out duration-500 w-1/2 lg:w-full">
                <img :src="props.theFrontImg || notFound" alt="Front Image" class="w-32 lg:w-40 lg:h-40 lg:mt-2">
                <img :src="props.theBackImg || notFound" alt="Back Image" class="w-40 h-40 mt-2 hidden lg:block">
            </div>

            <div
                class="font-pixel text-2xl capitalize group-hover:text-white group-hover:scale-110 transition ease-in-out duration-500 py-2 text-white w-1/2 lg:w-full flex flex-col lg:flex-row lg:items-center justify-center lg:gap-4">
                <div>
                    #{{ props.theId }}
                </div>
                <div class="truncate">
                    {{ props.theName }}
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import notFound from '@/assets/icons/img-not-found.png'

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
        default: undefined,
    },
    theBackImg: {
        type: String,
        default: undefined,
    },
});
</script>