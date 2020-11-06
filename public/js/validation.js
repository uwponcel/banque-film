(() => {
  //* Champs du formulaire
  let code = document.getElementById("code");
  let titre = document.getElementById("titre");
  let production = document.getElementById("production");
  let annee = document.getElementById("annee");
  let directeur = document.getElementById("directeur");
  let resume = document.getElementById("resume");

  //* Champs d'erreurs
  let codeError = document.getElementById("code-error");
  let titreError = document.getElementById("titre-error");
  let productionError = document.getElementById("production-error");
  let anneeError = document.getElementById("annee-error");
  let directeurError = document.getElementById("directeur-error");
  let resumeError = document.getElementById("resume-error");

  //* Formulaire
  let form = document.getElementById("form");

  //TODO TEXTE QUI UPDATE PAS
  /**
   ** Validation du code
   */
  const validateCode = () => {
    if (code.validity.valid) {
      codeError.innerText = "";
      codeError.classList.remove("visible");
    } else {
      if (code.validity.valueMissing) {
        codeError.innerText = "Veuillez entrer un code.";
      } else if (code.validity.tooShort) {
        codeError.innerText = "Le code est trop court.";
      } else if (code.validity.tooLong) {
        codeError.innerText = "Le code est trop long.";
      }
      codeError.classList.add("visible");
    }
  };

  /**
   ** Validation du titre
   */
  const validateTitre = () => {
    if (titre.validity.valid) {
      titreError.innerText = "";
      titreError.classList.remove("visible");
    } else {
      if (titre.validity.valueMissing) {
        titreError.innerText = "Veuillez entrer un titre.";
      } else if (titre.validity.tooLong) {
        titreError.innerText = "Le titre est trop long.";
      }
      titreError.classList.add("visible");
    }
  };

  /**
   ** Validation de la société de production
   */
  const validateProduction = () => {
    if (production.validity.valid) {
      productionError.innerText = "";
      productionError.classList.remove("visible");
    } else {
      if (production.validity.valueMissing) {
        productionError.innerText =
          "Veuillez entrer une société de production.";
      } else if (production.validity.tooLong) {
        productionError.innerText = "La société de production est trop longue.";
      }
      productionError.classList.add("visible");
    }
  };

  /**
   ** Validation de l'année
   */

  //TODO VALIDATION INCORECTE
  const validateAnnee = () => {
    if (annee.validity.valid) {
      anneeError.innerText = "";
      anneeError.classList.remove("visible");
    } else {
      if (annee.validity.valueMissing) {
        anneeError.innerText = "Veuillez entrer une année.";
      } else if (annee.validity.rangeUnderflow) {
        anneeError.innerText = "Année préhistorique.";
      } else if (annee.validity.tooLong) {
        anneeError.innerText = "L'année est trop longue.";
      }
      anneeError.classList.add("visible");
    }
  };

  /**
   ** Validation du directeur
   */
  const validateDirecteur = () => {
    if (directeur.validity.valid) {
      directeurError.innerText = "";
      directeurError.classList.remove("visible");
    } else {
      if (directeur.validity.valueMissing) {
        directeurError.innerText = "Veuillez entrer un directeur.";
      } else if (directeur.validity.tooLong) {
        directeurError.innerText = "Nom du directeur trop long.";
      }
      directeurError.classList.add("visible");
    }
  };

  /**
   * Validation du résumé
   */
  const validateResume = () => {
    if (resume.validity.valid) {
      resumeError.innerText = "";
      resumeError.classList.remove("visible");
    } else {
      if (resume.validity.valueMissing) {
        resumeError.innerText = "Veuillez entrer un résumé.";
      } else if (resume.validity.tooLong) {
        resumeError.innerText = "Résumé trop long.";
      }
      resumeError.classList.add("visible");
    }
  };

  /**
   ** Ajouter les fonctions de validation lorsque l'utilisateur change la valeur ou dé-focus l'<input>
   */
  //* Code IMBD
  code.addEventListener("input", validateCode);
  code.addEventListener("blur", validateCode);
  form.addEventListener("submit", validateCode);

  //* Titre
  titre.addEventListener("input", validateTitre);
  titre.addEventListener("blur", validateTitre);
  form.addEventListener("submit", validateTitre);

  //* Production
  production.addEventListener("input", validateProduction);
  production.addEventListener("blur", validateProduction);
  form.addEventListener("submit", validateProduction);

  //* Année
  annee.addEventListener("input", validateAnnee);
  annee.addEventListener("blur", validateAnnee);
  form.addEventListener("submit", validateAnnee);

  //* Directeur
  directeur.addEventListener("input", validateDirecteur);
  directeur.addEventListener("blur", validateDirecteur);
  form.addEventListener("submit", validateDirecteur);

  //*Resume
  resume.addEventListener("input", validateResume);
  resume.addEventListener("blur", validateResume);
  form.addEventListener("submit", validateResume);
})();
