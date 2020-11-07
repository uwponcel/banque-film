(() => {
  //* Formulaire
  let form = document.getElementById("form");

  //* Boîte de sélection des films
  let select = document.getElementById("film-select");

  //* Champs du formulaire
  let code = document.getElementById("code");
  let titre = document.getElementById("titre");
  let production = document.getElementById("production");
  let annee = document.getElementById("annee");
  let directeur = document.getElementById("directeur");
  let resume = document.getElementById("resume");

  //* Boutons
  let ajouter = document.getElementById("btn-ajouter");
  let vider = document.getElementById("btn-vider");
  let supprimer = document.getElementById("btn-supprimer");

  /**
   ** Liste de tous les films retournés par le serveur.
   */
  let listeFilms = [];
  let selectCode = 0;

  /**
   ** Remplir les champs du formulaire avec les informations du film choisi.
   */
  const changeFilmSelect = (event) => {
    // On va chercher le code du film à afficher
    let codeSelection = event.target.value;
    selectCode = codeSelection;
    console.log(selectCode);

    //* On recherche le film par son code dans notre liste de films
    let filmSelection = null;
    for (let film of listeFilms) {
      if (film.code === codeSelection) {
        filmSelection = film;
        break;
      }
    }

    //* On affiche le film dans le formulaire
    code.value = filmSelection.code;
    titre.value = filmSelection.titre;
    production.value = filmSelection.production;
    annee.value = filmSelection.annee;
    directeur.value = filmSelection.directeur;
    resume.value = filmSelection.resume;
  };

  /**
   ** Vider le formulaire.
   */
  const viderFilmForm = () => {
    code.value = "";
    titre.value = "";
    production.value = "";
    annee.value = "";
    directeur.value = "";
    resume.value = "";
  };

  /**
   ** Ajouter un film dans le select.
   */
  const ajouterFilmSelect = (code, titre) => {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = titre;
    select.append(option);
  };

  /**
   ** Supprimer le film en fonction du code dans le select.
   */
  const supprimerFilmSelect = (code) => {
    let option = select.querySelector(`option[value="${code}"]`);
    option.remove();
  };

  /**
   ** Aller chercher tout les films sur le serveur.
   */
  const getFilmServeur = async () => {
    let response = await fetch("/film");
    if (response.ok) {
      listeFilms = await response.json();
      for (let film of listeFilms) {
        ajouterFilmSelect(film.code, film.titre);
      }
    }
  };

  /**
   ** Ajouter un film sur le serveur.
   */
  const ajouterFilmServeur = (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      let formData = formToObject(form);
      fetch("/film", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      //Petit update du tableau pour le change value.
      listeFilms.push(formData);
      viderFilmForm();
    }
  };

  /**
   ** Supprimer un film sur le serveur.
   */
  const supprimerFilmServeur = () => {
    //supprimerFilmSelect(selectCode);
    fetch(`/film/${selectCode}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code.value,
      }),
    });

    viderFilmForm();
  };

  /**
   ** Connexion au serveur pour avoir les notifications en temps réel.
   */
  const connecterTempsReel = async () => {
    let source = new EventSource("/notification");

    source.addEventListener("add", (event) => {
      let data = JSON.parse(event.data);

      listeFilms.push(data);

      ajouterFilmSelect(data.code, data.titre);
    });

    source.addEventListener("delete", (event) => {
      let data = JSON.parse(event.data);

      for (let i = 0; i < listeFilms.length; i++) {
        if (listeFilms[i].code === data.code) {
          listeFilms.splice(i, 1);
          break;
        }
      }
      supprimerFilmSelect(data.code);
    });
  };

  getFilmServeur();
  connecterTempsReel();

  /**
   ** Events listeners pour les boutons
   */
  select.addEventListener("change", changeFilmSelect);
  vider.addEventListener("click", viderFilmForm);
  form.addEventListener("submit", ajouterFilmServeur);
  supprimer.addEventListener("click", supprimerFilmServeur);
})();
