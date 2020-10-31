/**
    * Middlewares
*/

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const sse = require('./middleware-sse');

/**
    * Requires
*/
const film = require('./banqueFilms'); 
const validation = require('./isFilmValid');



// Port pour le serveur. */
const PORT = process.env.PORT;

// Création du serveur.
let app = express();


// Mettre des options différentes à Helmet en développement.
let helmetOptions = null;
if(app.settings.env === 'development'){
    helmetOptions = require('./developement-csp');
}

// Ajout de middlewares
app.use(helmet(helmetOptions));
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ strict: false }));
app.use(serveStatic('./public'));
app.use(sse());

// Ajouter vos routes ici.
app.route('/film')
    .get((request,response) =>{
    response.status(200).json(film.getAll());
    })

    .post((request, response) => {
        if(!validation(request.body) || film.contains(request.body.code)){
            response.sendStatus(400);
            return;
        }
        film.add(request.body);
        response.sendStatus(200);
        //broadcast
        response.pushJson(request.body, 'add');
    })
    
app.route('/film/:code')
    .delete((request, response) => {
        if(!film.contains(request.params.code)){
            response.sendStatus(404);
            return;
        }

        else{
            film.remove(request.params.code);
            response.sendStatus(200);
            //broadcast
            response.pushJson( request.body, 'delete');
        }
    });

app.get('/notification', (request, response) =>{
        response.initStream();
});


// Renvoyer une erreur 404 pour les routes non définies.
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas.
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur.
app.listen(PORT);
