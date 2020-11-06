/**
 ** Middlewares.
 */
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const cors = require("cors");
const sse = require("./middleware-sse");

/**
 ** Requires.
 */
const film = require("./banqueFilms");
const validation = require("./isFilmValid");

//* Port pour le serveur.
const PORT = process.env.PORT;

//* Création du serveur.
let app = express();

//* Mettre des options différentes à Helmet en développement.
let helmetOptions = null;
if (app.settings.env === "development") {
  helmetOptions = require("./developement-csp");
}

//* Ajout de middlewares.
app.use(helmet(helmetOptions));
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ strict: false }));
app.use(serveStatic("./public"));
app.use(sse());

app
  .route("/film")

  //* Route pour get les livres
  .get((request, response) => {
    response.status(200).json(film.getAll());
  })

  //* Route pour ajouter un livre
  .post((request, response) => {
    if (
      film.contains(request.body.code) ||
      !validation.validateAll(request.body)
    ) {
      response.sendStatus(400);
      return;
    } else {
      film.add(request.body);
      response.sendStatus(200);

      //! Broadcast de l'événement
      response.pushJson(
        {
          code: request.body.code,
          titre: request.body.titre,
          production: request.body.production,
          annee: request.body.annee,
          directeur: request.body.directeur,
          resume: request.body.resume,
        },
        "add"
      );
    }
  });

//* Route pour supprimer un livre
app.delete("/film/:code", (request, response) => {
  if (
    !film.contains(request.params.code) ||
    !validation.validateCode(request.params.code)
  ) {
    response.sendStatus(400);
    return;
  } else {
    film.delete(request.params.code);
    response.sendStatus(200);

    //! Broadcast de l'événement
    response.pushJson(request.body, "delete");
  }
});

//* Route pour se connecter au serveur en temps réel
app.get("/notification", (request, response) => {
  response.initStream();
});

//* Renvoyer une erreur 404 pour les routes non définies.
app.use(function (request, response) {
  //* Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas.
  response.status(404).send(request.originalUrl + " not found.");
});

//* Démarrage du serveur.
app.listen(PORT);
