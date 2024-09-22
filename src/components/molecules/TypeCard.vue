<template>
    <div class="type-card flex items-center justify-center relative rounded-md cursor-pointer group min-w-24 min-h-14 lg:min-w-36 lg:min-h-16"
        @click="emitType">
        <div class="card-text font-semibold text-xl z-10 text-white capitalize">
            {{ props.theType }}
        </div>

        <img :src="props.theImg"
            class="absolute h-full w-full rounded-md brightness-75 lg:brightness-50 lg:group-hover:brightness-75 transition ease-in-out duration-500"
            alt="Background" />
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    theType: {
        type: String,
        required: true,
    },
    theImg: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['select-type'])

// Emitting the selected type to the homepage to make an api call and reload the pokemonGrid with the results
const emitType = () => {
    emit('select-type', props.theType)
}

</script>
<style scoped>
.type-card {
    .card-text {
        transition: all 0.5s ease-out;
    }

    @media (min-width: 768px) {
        &:hover .card-text {
            text-shadow: 1px 1px 4px black;
        }
    }

    @media (max-width: 767px) {
        .card-text {
            text-shadow: 1px 1px 4px black;
        }
    }
}
</style>
