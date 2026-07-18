export type Ile = {
  id: string;
  nom: string;
  numero: string;
  image: string;
  imagebig: string;
  terrain: string;
  meteo: string;
  difficulte: string;
  difficulteColor: string;
  niveau: number;
  pokemons: string[];
  description1: string;
  description2: string;
  biome1 : string;
  type1 : string;
  type2 : string;
  type3 : string;
  biome2 : string;
  type4 : string;
  type5 : string;
  type6 : string;
  levelMin: number;
  pickupSon: string;
};

export const ILES: Ile[] = [
  {
    id: "mele-mele",
    nom: "Mélé-Mélé",
    numero: "Île n°1 — Alola",
    image: "/ile1.png",
    imagebig: "/Mele-Mele-détourée.png",
    terrain: "Boisé",
    meteo: "🌤️ Ensoleillé",
    difficulte: "★★☆☆☆",
    difficulteColor: "text-green-400",
    niveau: 12,
    pokemons: ["Mismagius", "Sableye", "Absol", "Alolan Marowak"],
    description1: `Bienvenue sur l'île de la Moria, au large de Mele-Mele, peuplée exclusivement de Pokémon Spectre, Ténèbres et Psy. Peu de Dresseurs s'y aventurent, tant son atmosphère échappe aux règles habituelles.
Fin de l'entrée. Domaine classé zone d'intérêt occulte majeur.`,
    description2: "pass",
    biome1 : "Ile de la Moria",
    type1 : "/pokemon_types/ghost.png",
    type2 : "/pokemon_types/dark.png",
    type3 : "/pokemon_types/psychic.png",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 12,
    pickupSon: "/Appels Chen/Jour 5.wav",
  },
  {
    id: "akala",
    nom: "Akala",
    numero: "Île n°2 — Alola",
    image: "/ile2.png",
    imagebig: "/Akala-détourée.png",
    terrain: "Volcanique",
    meteo: "⛅ Nuageux",
    difficulte: "★☆☆☆☆",
    difficulteColor: "text-emerald-400",
    niveau: 2,
    pokemons: ["Makuhita", "Jangmo-o", "Charjabug", "Cutiefly", "Salandit", "Furfrou"],
    description1:`Bienvenue sur l'île d'Akala, Domaine du Combattant, réputé pour sa forte concentration de Pokémon Combat, Dragon et Électrik. Extrêmement compétitifs, ils s'organisent en groupes rivaux pour multiplier les épreuves de force, de vitesse et d'endurance. Chaque nouvel arrivant est accueilli par une cérémonie sportive testant son agilité et son esprit d'équipe.
Fin de l'entrée. Domaine classé zone d'intérêt sportif majeur.`,
    description2: `Bienvenue sur l'île d'Akala, Domaine de la Gourmandise, réputé pour ses Baies et sa forte population de Pokémon Fée, Normal et Feu. Ici, la nourriture est un art : les Pokémon participent à sa préparation et chaque repas est précédé d'un rituel de dégustation collective.
Fin de l'entrée. Domaine classé zone d'intérêt gastronomique majeur.`,
    biome1 : "Biome de la Compétition",
    type1 : "/pokemon_types/fighting.png",
    type2 : "/pokemon_types/dragon.png",
    type3 : "/pokemon_types/electric.png",
    biome2 : "Paradis Gourmand",
    type4 : "/pokemon_types/fairy.png",
    type5 : "/pokemon_types/normal.png",
    type6 : "/pokemon_types/fire.png",
    levelMin: 2,
    pickupSon: "/Appels Chen/Jour 1.wav",
  },
  {
    id: "ula-ula",
    nom: "Ula-Ula",
    numero: "Île n°3 — Alola",
    image: "/ile3.png",
    imagebig: "/Ula-Ula-détourée.png",
    terrain: "Montagneux",
    meteo: "🌧️ Pluie",
    difficulte: "★★★★☆",
    difficulteColor: "text-orange-400",
    niveau: 53,
    pokemons: ["Alolan Sandslash", "Skarmory", "Onix", "Rowlet", "Fomantis", "Grubbin"],
    description1: `Bienvenue sur l'île d'Ula-Ula, secteur du Mont Argenté, le plus haut relief d'Alola, peuplé de Pokémon Roche, Acier et Glace. Son sommet accueille la prestigieuse Ligue Pokémon, et tout visiteur doit faire ses preuves face aux gardiens du domaine.
Fin de l'entrée. Domaine classé zone d'intérêt montagnard majeur.`,
    description2: `Bienvenue sur l'île d'Ula-Ula, secteur des Terres Sauvages, où prairies et forêts abritent une biodiversité dominée par les Pokémon Plante, Vol et Insecte. De nombreuses familles y élèvent leurs petits, leur territoire soigneusement délimité.
Fin de l'entrée. Domaine classé zone d'intérêt naturel majeur.`,
    biome1 : "Mont Argenté",
    type1 : "/pokemon_types/rock.png",
    type2 : "/pokemon_types/steel.png",
    type3 : "/pokemon_types/ice.png",
    biome2 : "Les Terres Sauvages",
    type4 : "/pokemon_types/grass.png",
    type5 : "/pokemon_types/flying.png",
    type6 : "/pokemon_types/bug.png",
    levelMin: 53,
    pickupSon: "/Appels Chen/Jour 3.wav",
  },
  {
    id: "poni",
    nom: "Poni",
    numero: "Île n°4 — Alola",
    image: "/ile4.png",
    imagebig: "/Poni-détourée.png",
    terrain: "Aride",
    meteo: "⛈️ Orage",
    difficulte: "★★★☆☆",
    difficulteColor: "text-yellow-400",
    niveau: 32,
    pokemons: ["Wishiwashi", "Wimpod", "Mudbray", "Alolan Grimer"],
    description1: `Bienvenue sur l'île de Poni, secteur des Marécages, terrain hostile peuplé de Pokémon Eau, Sol et Poison farouches et indépendants. Les Dresseurs doivent affronter des épreuves pour explorer ce domaine, l'un des moins cartographiés d'Alola.
Fin de l'entrée. Domaine classé zone d'intérêt hostile majeur.`,
    description2: "pass",
    biome1 : "Biome des Marécages",
    type1 : "/pokemon_types/water.png",
    type2 : "/pokemon_types/ground.png",
    type3 : "/pokemon_types/poison.png",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 32,
    pickupSon: "/Appels Chen/Jour 6.wav",
  },
  {
    id: "labo",
    nom: "Laboratoire Aether",
    numero: "Île Scientifique — Alola",
    image: "/ile5.png",
    imagebig: "/ile5.png",
    terrain: "Artificielle",
    meteo: "🌤️ Ensoleillé",
    difficulte: "★★★★★",
    difficulteColor: "text-red-400",
    niveau: 98,
    pokemons: ["Alolan Raichu", "Bewear", "Comfey", "Type: Null"],
    description1: `Bienvenue sur l'île de la Tenta Fête, haut lieu festif d'Alola connu pour ses soirées animées et ses jeux. Pokémon et Dresseurs s'y mêlent chaque soir pour une grande célébration collective.
Fin de l'entrée. Domaine classé zone d'intérêt festif majeur.`,
    description2: "pass",
    biome1 : "pass",
    type1 : "pass",
    type2 : "pass",
    type3 : "pass",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 98,
    pickupSon: "/Appels Chen/Happening fin.wav",
  },
];