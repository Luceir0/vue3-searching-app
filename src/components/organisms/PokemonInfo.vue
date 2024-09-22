<template>
    <div
        class="w-screen -mx-8 lg:w-auto lg:mx-0 rounded-t-2xl lg:rounded-2xl bg-white/5 lg:min-h-[calc(100vh-230px)] 2xl:min-h-[calc(100vh-550px)]">
        <!-- Buttons to change the showing info -->
        <div class="flex items-center justify-center">
            <div class="flex-1 h-full py-6 flex items-center justify-center font-semibold text-xl rounded-tl-2xl cursor-pointer lg:hover:bg-white/15"
                :class="(activeCard === 'About') ? 'bg-white/10' : ''" @click="changecard('About')">
                About</div>
            <div class="flex-1 h-full py-6 flex items-center justify-center font-semibold text-xl cursor-pointer lg:hover:bg-white/15"
                :class="(activeCard === 'Abilities') ? 'bg-white/10' : ''" @click="changecard('Abilities')">Abilities
            </div>
            <div class="flex-1 h-full py-6 flex items-center justify-center font-semibold text-xl rounded-tr-2xl cursor-pointer lg:hover:bg-white/15"
                :class="(activeCard === 'Moves') ? 'bg-white/10' : ''" @click="changecard('Moves')">
                Moves</div>
        </div>

        <!-- Basic data -->
        <div v-if="activeCard === 'About'" class="py-5 px-10">
            <div class="text-xl font-semibold mt-4"><span class="font-bold pr-2">⭐ Base Experience: </span> {{
                props.pokemonDetail.base_experience }} points
            </div>
            <div class="text-xl font-semibold mt-4"><span class="font-bold pr-2">📏 Height:</span> {{
                props.pokemonDetail.height
                }} ''</div>
            <div class="text-xl font-semibold mt-4"><span class="font-bold pr-2">⚖️ Weight:</span> {{
                props.pokemonDetail.weight
            }} lbs</div>
        </div>

        <!-- Abilities -->
        <div v-if="activeCard === 'Abilities'" class="py-5 px-10">
            <ul class="abilities-list list-inside">
                <li v-for="(ability, index) in props.pokemonDetail.abilities" :key="index"
                    class="capitalize text-xl font-semibold mt-4">
                    {{ ability.ability.name }}
                </li>
            </ul>
        </div>

        <!-- Moves -->
        <div v-if="activeCard === 'Moves'" class="py-5 px-10">
            <ul class="moves-list list-inside max-h-60 2xl:max-h-80 overflow-auto">
                <li v-for="(move, index) in props.pokemonDetail.moves.slice(0, 10)" :key="index"
                    class="capitalize text-xl font-semibold mt-4">
                    {{ move.move.name }}
                </li>
            </ul>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// We're getting the details object by prop
const props = defineProps({
    pokemonDetail: {
        type: Object,
        required: true,
    }
});

const activeCard = ref<string>('About')

// We're here changing the showing activeCard
const changecard = (theCard: string) => {
    activeCard.value = theCard
}

</script>
<style scoped>
.marker {
    margin-right: 1rem;
    display: inline-block;
    width: 1rem;
}

.abilities-list li::before {
    content: "✨";
    @apply marker;
}

.moves-list li::before {
    content: "💢";
    @apply marker;
}
</style>