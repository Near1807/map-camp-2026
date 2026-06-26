export type Ile = {
  id: string;
  nom: string;
  numero: string;
  image: string;
  terrain: string;
  meteo: string;
  difficulte: string;
  difficulteColor: string;
  niveau: number;
  pokemons: string[];
  description: string;
  levelMin: number;
  pickupSon: string;
  sons: {
    terrain: string;
    faune: string;
    culture: string;
  };
};

export const ILES: Ile[] = [
  {
    id: "mele-mele",
    nom: "Mélé-Mélé",
    numero: "Île n°1 — Alola",
    image: "/ile1.png",
    terrain: "Boisé",
    meteo: "🌤️ Ensoleillé",
    difficulte: "★★☆☆☆",
    difficulteColor: "text-green-400",
    niveau: 12,
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    levelMin: 12,
    pickupSon: "/sons/pickup-mele-mele.mp3",
    sons: {
    terrain: "/sons/mele-terrain.mp3",
    faune: "/sons/mele-faune.mp3",
    culture: "/sons/mele-culture.mp3",
},
  },
  {
    id: "akala",
    nom: "Akala",
    numero: "Île n°2 — Alola",
    image: "/ile2.png",
    terrain: "Volcanique",
    meteo: "⛅ Nuageux",
    difficulte: "★☆☆☆☆",
    difficulteColor: "text-emerald-400",
    niveau: 2,
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    levelMin: 2,
    pickupSon: "/sons/pickup-akala.mp3",
    sons: {
      terrain: "/sons/akala-terrain.mp3",
      faune: "/sons/akala-faune.mp3",
      culture: "/sons/akala-culture.mp3",
      },
  },
  {
    id: "ula-ula",
    nom: "Ula-Ula",
    numero: "Île n°3 — Alola",
    image: "/ile3.png",
    terrain: "Montagneux",
    meteo: "🌧️ Pluie",
    difficulte: "★★★★☆",
    difficulteColor: "text-orange-400",
    niveau: 53,
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    levelMin: 53,
    pickupSon: "/sons/pickup-ula-ula.mp3",
    sons: {
      terrain: "/sons/ula-ula-terrain.mp3",
      faune: "/sons/ula-ula-faune.mp3",
      culture: "/sons/ula-ula-culture.mp3",
      },
  },
  {
    id: "poni",
    nom: "Poni",
    numero: "Île n°4 — Alola",
    image: "/ile4.png",
    terrain: "Aride",
    meteo: "⛈️ Orage",
    difficulte: "★★★☆☆",
    difficulteColor: "text-yellow-400",
    niveau: 32,
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    levelMin: 32,
    pickupSon: "/sons/pickup-poni.mp3",
    sons: {
      terrain: "/sons/poni-terrain.mp3",
      faune: "/sons/poni-faune.mp3",
      culture: "/sons/poni-culture.mp3",
      },
  },
  {
    id: "labo",
    nom: "Laboratoire Aether",
    numero: "Île Scientifique — Alola",
    image: "/ile5.png",
    terrain: "Artificielle",
    meteo: "🌤️ Ensoleillé",
    difficulte: "★★★★★",
    difficulteColor: "text-red-400",
    niveau: 98,
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    levelMin: 98,
    pickupSon: "/sons/pickup-labo.mp3",
    sons: {
      terrain: "/sons/labo-terrain.mp3",
      faune: "/sons/labo-faune.mp3",
      culture: "/sons/labo-culture.mp3",
      },
  },
];