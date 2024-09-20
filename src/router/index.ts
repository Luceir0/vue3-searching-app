import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PokemonDetailView from "@/views/PokemonDetailView.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/pokemon/:idOrName",
    name: "PokemonDetails",
    component: PokemonDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
