export type Badge = {
  name: string;
  icon: string;
  obtention: boolean;
};

export const badges: Badge[] = [
  { name: "insecte", icon: "bug.png", obtention: true },
  { name: "tenebre", icon: "dark.png", obtention: true },
  { name: "dragon", icon: "dragon.png", obtention: true },
  { name: "electric", icon: "electric.png", obtention: true },
  { name: "fée", icon: "fairy.png", obtention: true },
  { name: "combat", icon: "fighting.png", obtention: true },
  { name: "feu", icon: "fire.png", obtention: true },
  { name: "vol", icon: "flying.png", obtention: true },
  { name: "spectre", icon: "ghost.png", obtention: true },
  { name: "plante", icon: "grass.png", obtention: true },
  { name: "sol", icon: "ground.png", obtention: false },
  { name: "glace", icon: "ice.png", obtention: true },
  { name: "normal", icon: "normal.png", obtention: true },
  { name: "poison", icon: "poison.png", obtention: false },
  { name: "psychic", icon: "psychic.png", obtention: true },
  { name: "roche", icon: "rock.png", obtention: true },
  { name: "acier", icon: "steel.png", obtention: true },
  { name: "eau", icon: "water.png", obtention: false },
];