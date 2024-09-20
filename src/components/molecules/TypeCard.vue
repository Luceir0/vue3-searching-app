<template>
    <div class="flex items-center justify-center relative rounded-md cursor-pointer group min-w-24 min-h-14 lg:min-w-36 lg:min-h-16"
        @click="emitType">
        <div class="font-semibold text-lg z-10 group-hover:text-white transition ease-in-out duration-500 capitalize">
            {{ props.theType }}
        </div>

        <img :src="props.theImg"
            class="absolute h-full w-full rounded-md brightness-50 group-hover:brightness-75 transition ease-in-out duration-500"
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

const emitType = () => {
    emit('select-type', props.theType)
}

</script>
