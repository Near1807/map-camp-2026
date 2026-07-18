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
  pickupSon2: string;
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
    pokemons: ["Mysdibule", "Ténéfix", "Absol", "Ossatueur d'Alola"],
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
    pickupSon2: "pass",
  },

  // === AKALA — scindée en 2 sous-îles (une par biome) ===
  {
    id: "akala-olympique",
    nom: "Akala — Domaine du Combattant",
    numero: "Île n°2a — Alola",
    // 🚧 PLACEHOLDER — à remplacer par tes vraies images
    image: "/TODO-akala-olympique.png",
    imagebig: "/olympique_Isolée",
    terrain: "Volcanique",
    meteo: "⛅ Nuageux",
    difficulte: "★☆☆☆☆",
    difficulteColor: "text-emerald-400",
    niveau: 2,
    pokemons: ["Makuhita", "Jangmo-o", "Chrysapile"],
    description1: `Bienvenue sur l'île d'Akala, Domaine du Combattant, réputé pour sa forte concentration de Pokémon Combat, Dragon et Électrik. Extrêmement compétitifs, ils s'organisent en groupes rivaux pour multiplier les épreuves de force, de vitesse et d'endurance. Chaque nouvel arrivant est accueilli par une cérémonie sportive testant son agilité et son esprit d'équipe.
Fin de l'entrée. Domaine classé zone d'intérêt sportif majeur.`,
    description2: "pass",
    biome1 : "Biome de la Compétition",
    type1 : "/pokemon_types/fighting.png",
    type2 : "/pokemon_types/dragon.png",
    type3 : "/pokemon_types/electric.png",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 2,
    pickupSon: "/Appels Chen/Jour 1.wav",
    pickupSon2: "pass",
  },
  {
    id: "akala-gourmandise",
    nom: "Akala — Paradis Gourmand",
    numero: "Île n°2b — Alola",
    // 🚧 PLACEHOLDER — à remplacer par tes vraies images
    image: "/TODO-akala-gourmandise.png",
    imagebig: "/Concu_Isolée.png",
    terrain: "Volcanique",
    meteo: "⛅ Nuageux",
    difficulte: "★☆☆☆☆",
    difficulteColor: "text-emerald-400",
    niveau: 2,
    pokemons: ["Bombydou", "Tritox", "Couafarel"],
    description1: `Bienvenue sur l'île d'Akala, Domaine de la Gourmandise, réputé pour ses Baies et sa forte population de Pokémon Fée, Normal et Feu. Ici, la nourriture est un art : les Pokémon participent à sa préparation et chaque repas est précédé d'un rituel de dégustation collective.
Fin de l'entrée. Domaine classé zone d'intérêt gastronomique majeur.`,
    description2: "pass",
    biome1 : "Paradis Gourmand",
    type1 : "/pokemon_types/fairy.png",
    type2 : "/pokemon_types/normal.png",
    type3 : "/pokemon_types/fire.png",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 2,
    pickupSon: "/Appels Chen/Jour 2.wav",
    pickupSon2: "pass",
  },

  // === ULA-ULA — scindée en 2 sous-îles (une par biome) ===
  {
    id: "ula-ula-montagne",
    nom: "Ula-Ula — Mont Argenté",
    numero: "Île n°3a — Alola",
    // 🚧 PLACEHOLDER — à remplacer par tes vraies images
    image: "/TODO-ula-ula-montagne.png",
    imagebig: "/normale_Isolée.png",
    terrain: "Montagneux",
    meteo: "🌧️ Pluie",
    difficulte: "★★★★☆",
    difficulteColor: "text-orange-400",
    niveau: 53,
    pokemons: ["Sablaireau d'Alola", "Airmure", "Onix"],
    description1: `Bienvenue sur l'île d'Ula-Ula, secteur du Mont Argenté, le plus haut relief d'Alola, peuplé de Pokémon Roche, Acier et Glace. Son sommet accueille la prestigieuse Ligue Pokémon, et tout visiteur doit faire ses preuves face aux gardiens du domaine.
Fin de l'entrée. Domaine classé zone d'intérêt montagnard majeur.`,
    description2: "pass",
    biome1 : "Mont Argenté",
    type1 : "/pokemon_types/rock.png",
    type2 : "/pokemon_types/steel.png",
    type3 : "/pokemon_types/ice.png",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 53,
    pickupSon: "/Appels Chen/Jour 3.wav",
    pickupSon2: "pass",
  },
  {
    id: "ula-ula-hike",
    nom: "Ula-Ula — Terres Sauvages",
    numero: "Île n°3b — Alola",
    // 🚧 PLACEHOLDER — à remplacer par tes vraies images
    image: "/TODO-ula-ula-hike.png",
    imagebig: "/Marche_Isolée.png",
    terrain: "Montagneux",
    meteo: "🌧️ Pluie",
    difficulte: "★★★★☆",
    difficulteColor: "text-orange-400",
    niveau: 53,
    pokemons: ["Brindibou", "Mimantis", "Larvibule"],
    description1: `Bienvenue sur l'île d'Ula-Ula, secteur des Terres Sauvages, où prairies et forêts abritent une biodiversité dominée par les Pokémon Plante, Vol et Insecte. De nombreuses familles y élèvent leurs petits, leur territoire soigneusement délimité.
Fin de l'entrée. Domaine classé zone d'intérêt naturel majeur.`,
    description2: "pass",
    biome1 : "Les Terres Sauvages",
    type1 : "/pokemon_types/grass.png",
    type2 : "/pokemon_types/flying.png",
    type3 : "/pokemon_types/bug.png",
    biome2 : "pass",
    type4 : "pass",
    type5 : "pass",
    type6 : "pass",
    levelMin: 53,
    pickupSon: "/Appels Chen/Jour 4.wav",
    pickupSon2: "pass",
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
    pokemons: ["Froussardine", "Sovkipou", "Tiboudet", "Tadmorv d'Alola"],
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
    pickupSon2: "pass",
  },
  {
    id: "labo",
    nom: "Ile de la Fortune",
    numero: "Île Casino — Alola",
    image: "/ile5.png",
    imagebig: "/ile5.png",
    terrain: "Artificielle",
    meteo: "🌤️ Ensoleillé",
    difficulte: "★★★★★",
    difficulteColor: "text-red-400",
    niveau: 98,
    pokemons: ["Raichu d'Alola", "Chelours", "Guérilande", "Type:0"],
    description1: `Bienvenue sur l'île de la Fortune, haut lieu festif d'Alola connu pour ses soirées animées et ses jeux. Pokémon et Dresseurs s'y mêlent chaque soir pour une grande célébration collective.
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
    pickupSon2: "pass",
  },
];