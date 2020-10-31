const validateCode = (code) =>
{   
    return typeof code === 'string' &&
    code &&
    code.length === 7;
}

function validateTitre(titre) {
    return typeof titre === 'string' &&
        titre &&
        titre.length <= 100;
}

const validateProduction = (production) => 
{
        return typeof production === 'string' &&
        production &&
        production.length <= 100;
}

const validateAnnee = (annee) =>
{
    return typeof annee === 'string' &&
    annee &&
    annee >= 0;
}

const validateDirecteur = (directeur) => 
{
        return typeof directeur === 'string' &&
        directeur && 
        directeur.length <= 100;
}

const validateResume = (resume) => 
{
        return typeof resume === 'string' &&
        resume &&
        resume.length <= 1000;
}

module.exports = (film) => {
    console.log("Code: " + validateCode(film.code));
    console.log("Titre: " + validateTitre(film.titre));
    console.log("Production: " + validateProduction(film.production));
    console.log("Annee: " + validateAnnee(film.annee));
    console.log("Directeur: " + validateDirecteur(film.directeur));
    console.log("Resume: " + validateResume(film.resume));
    return  validateCode(film.code) &&
            validateTitre(film.titre) &&
            validateProduction(film.production) &&
            validateAnnee(film.annee) &&
            validateDirecteur(film.directeur) &&
            validateResume(film.resume);
}