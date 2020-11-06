let listeFilms = [
  {
    code: "0325980",
    titre: "Pirates des Caraïbes : La Malédiction du Black Pearl",
    production: "Walt Disney Pictures",
    annee: 2003,
    directeur: "Gore Verbinski",
    resume:
      "Petite, Elizabeth Swann, la fille du gouverneur, a sauvé de la noyade Will Turner après le naufrage de son bateau. Les années ont passé, Will et Elizabeth ont grandi. Will est devenu forgeron à Port Royal, et Elizabeth se prépare à épouser le commodore Norrington. Cependant, la vie d'Elizabeth bascule lorsque le capitaine Barbossa et sa bande de pirates décident d'attaquer Port Royal et la prennent en otage. Malheureusement pour lui, Barbossa a commis deux erreurs.",
  },
  {
    code: "0499549",
    titre: "Avatar",
    production: "20th Century Fox",
    annee: 2009,
    directeur: "James Cameron",
    resume:
      "Malgré sa paralysie, Jake Sully, un ancien marine immobilisé dans un fauteuil roulant, est resté un combattant au plus profond de son être. Il est recruté pour se rendre à des années-lumière de la Terre, sur Pandora, où de puissants groupes industriels exploitent un minerai rarissime destiné à résoudre la crise énergétique sur Terre.",
  },
];

/**
 ** Vérifie si le code existe dans la liste.
 */
exports.contains = (code) => {
  return listeFilms.find((o) => o.code === code);
};

/**
 ** Retourne la liste de films.
 */
exports.getAll = () => {
  return listeFilms;
};

/**
 ** Ajoute un film à la liste.
 */
exports.add = (film) => {
  listeFilms.push({
    code: film.code,
    titre: film.titre,
    production: film.production,
    annee: film.annee,
    directeur: film.directeur,
    resume: film.resume,
  });
};

/**
 ** Retire un film de la liste de films en fonction du code.
 */
exports.delete = (code) => {
  listeFilms.splice(
    listeFilms.findIndex((item) => item.code === code),
    1
  );
};
