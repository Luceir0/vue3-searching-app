import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PokemonDetailView from "@/views/PokemonDetailView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

// Here, we're defyning the views
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
  // To get a router history:
  history: createWebHistory(),
  routes,
  // To return to the top of the page when we're navigating
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
