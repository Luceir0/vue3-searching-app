interface PokemonType {
  name: string;
  image: string;
}

import allType from "@/assets/backgrounds/all_type.jpg";
import bugType from "@/assets/backgrounds/bug_type.jpg";
import darkType from "@/assets/backgrounds/dark_type.jpg";
import dragonType from "@/assets/backgrounds/dragon_type.jpg";
import electricType from "@/assets/backgrounds/electric_type.jpg";
import fairyType from "@/assets/backgrounds/fairy_type.jpg";
import fightingType from "@/assets/backgrounds/fighting_type.jpg";
import fireType from "@/assets/backgrounds/fire_type.jpg";
import flyingType from "@/assets/backgrounds/flying_type.jpg";
import grassType from "@/assets/backgrounds/grass_type.jpg";
import groundType from "@/assets/backgrounds/ground_type.jpg";
import iceType from "@/assets/backgrounds/ice_type.jpg";
import physicType from "@/assets/backgrounds/physic_type.jpg";
import poisonType from "@/assets/backgrounds/poison_type.jpg";
import rockType from "@/assets/backgrounds/rock_type.jpg";
import steelType from "@/assets/backgrounds/steel_type.jpg";
import waterType from "@/assets/backgrounds/water_type.jpg";

export const pokemonTypes: PokemonType[] = [
  { name: "all", image: allType },
  { name: "bug", image: bugType },
  { name: "dark", image: darkType },
  { name: "dragon", image: dragonType },
  { name: "electric", image: electricType },
  { name: "fairy", image: fairyType },
  { name: "fighting", image: fightingType },
  { name: "fire", image: fireType },
  { name: "flying", image: flyingType },
  { name: "grass", image: grassType },
  { name: "ground", image: groundType },
  { name: "ice", image: iceType },
  { name: "psychic", image: physicType },
  { name: "poison", image: poisonType },
  { name: "rock", image: rockType },
  { name: "steel", image: steelType },
  { name: "water", image: waterType },
];
