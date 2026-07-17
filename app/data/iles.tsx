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
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description1: `Bienvenue sur l'île de la Moria, au large de Mele-Mele. Cette île isolée abrite exclusivement des Pokémon de type Spectre, Ténèbres et Psy, aux capacités aussi fascinantes que mystérieuses.
Peu de Dresseurs s'aventurent sur ce territoire, réputé pour son atmosphère singulière et ses phénomènes difficiles à expliquer par la science conventionnelle. Les Pokémon qui y résident possèdent tous, à des degrés divers, des pouvoirs surnaturels leur permettant d'interagir avec leur environnement de façon peu commune.
La légende locale raconte que l'île obéit à des règles bien à elle, où les repères habituels ne s'appliquent pas toujours de la même manière qu'ailleurs. Les rares visiteurs rapportent unanimement une impression de décalage persistant durant toute la traversée de l'île.
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
    pickupSon: "/sons/pickup-mele-mele.mp3",
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
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description1:`Bienvenue sur l'île d'Akala, Domaine du Combattant. Cette zone est reconnue dans toute la région d'Alola pour abriter l'une des plus fortes concentrations de Pokémon de type Combat, Dragon et Électrik jamais recensées.
Les Pokémon de ce domaine partagent tous une caractéristique commune : un tempérament extrêmement compétitif. Ils s'organisent naturellement en groupes rivaux et multiplient les épreuves de force, de vitesse et d'endurance pour déterminer les plus performants d'entre eux.
La coutume locale veut que chaque nouvel arrivant soit accueilli par une cérémonie sportive, où les Pokémon du domaine testent l'agilité et l'esprit d'équipe des visiteurs. Un vaste complexe, comparable à une arène à ciel ouvert, permet également aux plus téméraires de tenter d'établir de nouveaux records aux côtés des habitants. Fin de l'entrée. Domaine classé zone d'intérêt sportif majeur.`,
    description2: `Bienvenue sur l'île d'Akala, Domaine de la Gourmandise ou aussi appelé Paradis Gourmand. Cette région est célèbre pour son sol particulièrement fertile, propice à la culture de nombreuses variétés de Baies, ainsi que pour sa forte population de Pokémon de type Fée, Normal et Feu.
Les habitants de ce domaine entretiennent une relation particulière avec la nourriture, considérée localement comme un art à part entière. De nombreux Pokémon participent activement à la préparation des repas, que ce soit en cultivant les ingrédients ou en surveillant leur cuisson avec une attention presque cérémonielle.
La tradition veut que chaque repas partagé sur l'île soit précédé d'un rituel de dégustation collective, où petits et grands Pokémon donnent leur avis sur les mets proposés. Ce domaine est d'ailleurs réputé pour organiser régulièrement des concours culinaires rassemblant les meilleurs cuisiniers de la région.
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
    pickupSon: "/sons/pickup-akala.mp3",
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
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description1: `Bienvenue sur l'île d'Ula-Ula, secteur du Mont Argenté. Ce relief imposant, le plus haut de toute la région d'Alola, abrite une population dense de Pokémon de type Roche, Acier et Glace, parfaitement adaptés aux conditions rigoureuses de haute altitude.
Le sommet de cette montagne légendaire accueille la prestigieuse Ligue Pokémon, réservée à une élite de Dresseurs. L'ascension du mont est traditionnellement considérée comme une épreuve à part entière, au même titre que les combats qui s'y déroulent.
Les Pokémon de ce domaine sont réputés pour leur discipline et leur robustesse. Nombre d'entre eux consacrent leur existence à façonner le relief environnant, sculptant la roche et le minerai avec une patience remarquable. La coutume locale veut que tout visiteur souhaitant approcher le sommet fasse d'abord ses preuves face aux gardiens du domaine.
Fin de l'entrée. Domaine classé zone d'intérêt montagnard majeur.`,
    description2: `Bienvenue sur l'île d'Ula-Ula, secteur des Terres Sauvages. Cette vaste étendue de prairies et de forêts denses abrite une biodiversité exceptionnelle, dominée par les Pokémon de type Plante, Vol et Insecte.
Ce domaine est particulièrement connu pour accueillir un grand nombre de familles Pokémon, les parents y élevant leurs petits à l'abri des regards, au cœur d'une végétation luxuriante offrant nourriture et protection en abondance.
La tradition locale veut que les Dresseurs de passage respectent scrupuleusement la tranquillité des nichées, chaque zone du territoire étant soigneusement délimitée par les habitants eux-mêmes. Les longs sentiers qui traversent ce domaine sont d'ailleurs empruntés depuis des générations par les explorateurs venus observer cette faune foisonnante.
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
    pickupSon: "/sons/pickup-ula-ula.mp3",
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
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description1: `Bienvenue sur l'île de Poni, secteur des Marécages. Cette région humide et difficile d'accès abrite une population résiliente de Pokémon de type Eau, Sol et Poison, parfaitement adaptés à ce terrain exigeant.
Réputés pour leur caractère farouche et indépendant, les Pokémon de ce domaine ne se laissent approcher qu'avec beaucoup de patience et de détermination. Le sol marécageux, instable et glissant, constitue un véritable défi pour quiconque tente de le traverser.
La coutume veut que les Dresseurs souhaitant explorer ce territoire soient soumis à une série d'épreuves organisées par les habitants eux-mêmes, testant à la fois l'endurance physique et la ténacité des visiteurs. Ce domaine reste, encore aujourd'hui, l'un des moins cartographiés de toute la région.
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
    pickupSon: "/sons/pickup-poni.mp3",
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
    pokemons: ["Rattata", "Pikipek", "Yungoos"],
    description1: `Bienvenue sur l'île de la Tenta Fête. Contrairement aux autres territoires de la région, cette île ne se distingue pas par une population Pokémon particulière, mais par sa réputation de haut lieu festif, connu dans tout Alola pour ses soirées animées et ses jeux en tout genre.
De nombreux Pokémon aux talents variés s'y retrouvent régulièrement pour divertir les visiteurs, chacun rivalisant d'inventivité pour proposer les attractions les plus originales. L'île est réputée pour son ambiance chaleureuse et sa tradition d'accueil sans pareille.
La coutume locale veut que chaque soirée organisée sur l'île se termine par une grande célébration collective, où Dresseurs et Pokémon se mêlent sans distinction pour profiter ensemble de la fête.
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
    pickupSon: "/sons/pickup-labo.mp3",
  },
];