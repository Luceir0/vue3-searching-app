import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PokemonDetailView from "@/views/PokemonDetailView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/pokemon/:idOrName",
    name: "PokemonDetails",
    component: PokemonDetailView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
