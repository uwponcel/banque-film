(() => {

    // Boîte de sélection des films
    let select = document.getElementById('film-select');
    let filmForm = document.getElementById('film-form');

    // Champs du formulaire
    let code = document.getElementById('code');
    let titre = document.getElementById('titre');
    let production = document.getElementById('production');
    let annee = document.getElementById('annee');
    let directeur = document.getElementById('directeur');
    let resume = document.getElementById('resume');

    // Boutons
    let ajouter = document.getElementById('btn-ajouter');
    let vider = document.getElementById('btn-vider');
    let supprimer = document.getElementById('btn-supprimer');

    // Champs d'erreurs
    let codeError = document.getElementById('code-error');
    let titreError = document.getElementById('titre-error');
    let productionError = document.getElementById('production-error');
    let anneeError = document.getElementById('annee-error');
    let directeurError = document.getElementById('directeur-error');
    let resumeError = document.getElementById('resume-error');

    /**
     * Liste de tous les films retournés par le serveur.
     */
    let listeFilms = [];
    let selectCode = 0;

   //TODO TEXTE QUI UPDATE PAS
     /**
     * Validation du code
     */
    const validateCode = () => {
        if(code.validity.valid){
            codeError.innerText = '';
            codeError.classList.remove('visible');
            code.classList.remove('visible');
        }
        else{
            if(code.validity.valueMissing){
                codeError.innerText = 'Veuillez entrer un code.';
            }
            else if(code.validity.tooShort){
                codeError.innerText = 'Le code est trop court.';
            }
            codeError.classList.add('visible');
            code.classList.add('visible');
        }
    };

    /**
     * Validation du titre
     */
    const validateTitre= () => {
        if(titre.validity.valid){
            titreError.innerText = '';
            titreError.classList.remove('visible');
            titre.classList.remove('visible');
        }
        else{
            if(titre.validity.valueMissing){
                titreError.innerText = 'Veuillez entrer un titre.';
            }
            titreError.classList.add('visible');
            titre.classList.add('visible');
        }
    };

    /**
     * Validation de la société de production
     */
    const validateProduction = () => {
        if(production.validity.valid){
            productionError.innerText = '';
            productionError.classList.remove('visible');
            production.classList.remove('visible');
        }
        else{
            if(production.validity.valueMissing){
                productionError.innerText = 'Veuillez entrer une société de production.';
            }
            productionError.classList.add('visible');
            production.classList.add('visible');
        }
    };

     /**
     * Validation de l'année
     */

     //TODO VALIDATION INCORECTE
    const validateAnnee = () => {
        if(annee.validity.valid){
            anneeError.innerText = '';
            anneeError.classList.remove('visible');
            annee.classList.remove('visible');
        }
        else{
            if(annee.validity.valueMissing){
                anneeError.innerText = 'Veuillez entrer une année.';
            }
            else if(annee.validity.patternMismatch){
                anneeError.innerText = 'Année plus grande que 0 S.V.P.';
            }
            anneeError.classList.add('visible');
            annee.classList.add('visible');
        }
    };

    /**
     * Validation du directeur
     */
    const validateDirecteur = () => {
        if(directeur.validity.valid){
            directeurError.innerText = '';
            directeurError.classList.remove('visible');
            directeur.classList.remove('visible');
        }
        else{
            if(directeur.validity.valueMissing){
                directeurError.innerText = 'Veuillez entrer un/une directeur/directrice.';
            }
            directeurError.classList.add('visible');
            directeur.classList.add('visible');
        }
    };

      /**
     * Validation du résumé
     */
    const validateResume = () => {
        if(resume.validity.valid){
            resumeError.innerText = '';
            resumeError.classList.remove('visible');
            resume.classList.remove('visible');
        }
        else{
            if(resume.validity.valueMissing){
                resumeError.innerText = 'Veuillez entrer un résumé.';
            }
            resumeError.classList.add('visible');
            resume.classList.add('visible');
        }
    };

    

    /**
     * Remplir les champs du formulaire avec les informations du film choisi.
     */
    const changeFilmSelect = (event) => {
        // On va chercher le code du film à afficher
        let codeSelection = event.target.value;
        selectCode = codeSelection;
        console.log(selectCode);
        
        // On recherche le film par son code dans notre liste de films
        let filmSelection = null;
        for(let film of listeFilms){
            if(film.code === codeSelection){
                filmSelection = film;
                break;
            }
        }

        // On affiche le film dans le formulaire
        code.value = filmSelection.code;
        titre.value = filmSelection.titre;
        production.value = filmSelection.production;
        annee.value = filmSelection.annee;
        directeur.value = filmSelection.directeur;
        resume.value = filmSelection.resume;
    }

    /**
     * Vider le formualire.
     */
    const viderFilmForm = () => {
        code.value = "";
        titre.value = "";
        production.value = "";
        annee.value = "";
        directeur.value = "";
        resume.value = "";
    }

    /**
     * Ajouter un film dans le select.
     */
    const ajouterFilmSelect = (code, titre) => {
        let option = select.children[0].cloneNode(true);
        option.disabled = false;
        option.value = code;
        option.innerText = titre;
        select.append(option);
    }

    /**
     * Supprimer le film en fonction du code dans le select.
     */
    const supprimerFilmSelect = (code) => {
        for (let i = 0; i < select.length; i++) {
            if (select.options[i].value === code){
            select.remove(i);
            }
        }
    }



    /**
     * Aller chercher toutes les données des films sur le serveurs.
     */
    const getFilmServeur = async () => {
        let response = await fetch('/film');
        if(response.ok){
            let filmArray = await response.json();
            listeFilms = filmArray;
            for(let i = 0 ; i < filmArray.length ; i++){
                ajouterFilmSelect(filmArray[i].code, filmArray[i].titre);
            }
        }
    }

    /**
     * Ajouter un film sur le serveur.
     */
    const ajouterFilmServeur = (event) => {
        event.preventDefault();

        if(filmForm.checkValidity()){
            let formData = formToObject(filmForm);
            fetch('/film', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            //Petit update du tableau pour le change value.
            listeFilms.push(formData);
            viderFilmForm();
        }
    }

    /**
     * Supprimer un film sur le serveur.
     */
    const supprimerFilmServeur = (event) => {
        event.preventDefault();
        supprimerFilmSelect(selectCode);
        fetch(`/film/${selectCode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code.value
            })
        });

        viderFilmForm();
    }

    /**
     * Connexion au serveur pour avoir les notifications en temps réel.
     */
    const connecterTempsReel = async () => {
 
        let source = new EventSource('/notification');

        source.addEventListener('add' ,(event) =>{
            let data = JSON.parse(event.data);
            ajouterFilmSelect(data.code, data.titre);
        });

        source.addEventListener('delete',(event)=>{
            let data = JSON.parse(event.data);
            supprimerFilmSelect(data.code);
        })
    }


    // Ajouter les fonctions de validation lorsque l'utilisateur change la 
    // valeur ou dé-focus l'<input>
    code.addEventListener('input', validateCode);
    code.addEventListener('blur', validateCode);
    ajouter.addEventListener('click', validateCode);
    titre.addEventListener('input', validateTitre);
    titre.addEventListener('blur', validateTitre);
    ajouter.addEventListener('click', validateTitre);
    production.addEventListener('input', validateProduction);
    production.addEventListener('blur', validateProduction);
    ajouter.addEventListener('click', validateProduction);
    annee.addEventListener('input', validateAnnee);
    annee.addEventListener('blur', validateAnnee);
    ajouter.addEventListener('click', validateAnnee);
    directeur.addEventListener('input', validateDirecteur);
    directeur.addEventListener('blur', validateDirecteur);
    ajouter.addEventListener('click', validateDirecteur);
    resume.addEventListener('input', validateResume);
    resume.addEventListener('blur', validateResume);
    ajouter.addEventListener('click', validateResume);


    /**
     * Events listeners pour les boutons
     */
    vider.addEventListener('click', viderFilmForm);
    ajouter.addEventListener('click', ajouterFilmServeur);
    supprimer.addEventListener('click', supprimerFilmServeur);

    connecterTempsReel();
    getFilmServeur();

    select.addEventListener('change', changeFilmSelect);
})();