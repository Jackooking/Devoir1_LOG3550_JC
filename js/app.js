const CLE_STOCKAGE = "bibliotheque-livres";

let livres = chargerLivres();

function chargerLivres() {
  const sauvegarde = localStorage.getItem(CLE_STOCKAGE);

  if (sauvegarde === null) {
    return [...LIVRES_DEPART];
  }
  return JSON.parse(sauvegarde);
}

function sauvegarderLivres() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(livres));
}

function reinitialiserLivres() {
    livres = [...LIVRES_DEPART];
  sauvegarderLivres();
  actualiserAffichage();
}

function creerCarteLivre(livre) {
  const carte = document.createElement("article");

  const titre = document.createElement("h3");
  titre.textContent = livre.titre;

  const auteur = document.createElement("p");
  auteur.textContent = "Auteur : " + livre.auteur;

  const annee = document.createElement("p");
  annee.textContent = "Année : " + livre.annee;

  const categorie = document.createElement("p");
  categorie.textContent = "Catégorie : " + livre.categorie;

    const etat = document.createElement("span");
  if (livre.disponible) {
    etat.textContent = "Disponible";
    etat.classList.add("etiquette-disponible");
  } else {
    etat.textContent = "Emprunté";
    etat.classList.add("etiquette-empruntee");
  }
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.type = "button";
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.addEventListener("click", function () {
        supprimerLivre(livre.id);
  });
  carte.append(titre, auteur, annee, categorie, etat, boutonSupprimer);
  return carte;
}

function afficherLivres(livres) {
  const liste = document.querySelector("#liste-livres");
  liste.replaceChildren();

  livres.forEach(function (livre) {
    liste.append(creerCarteLivre(livre));
  });
}

// Enlève les accents et les majuscules pour comparer les textes
function normaliser(texte) {
  return texte.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function filtrerLivres(livres) {
  const recherche = normaliser(document.querySelector("#recherche").value);
  const categorie = document.querySelector("#filtre-categorie").value;
  const disponiblesSeulement = document.querySelector("#filtre-disponibles").checked;
  return livres.filter(function (livre) {
    const trouveDansTitre = normaliser(livre.titre).includes(recherche);
    const trouveDansAuteur = normaliser(livre.auteur).includes(recherche);
    const correspondACategorie = categorie ? livre.categorie === categorie : true;
    const estDisponible = disponiblesSeulement ? livre.disponible : true;
    return (trouveDansTitre || trouveDansAuteur) && correspondACategorie && estDisponible;
  });
}
function trierLivres(livres) {
  const tri = document.querySelector("#tri").value;
  const copie = [...livres];

  copie.sort(function (a, b) {
    if (tri === "titre-asc") return a.titre.localeCompare(b.titre, "fr");
    if (tri === "titre-desc") return b.titre.localeCompare(a.titre, "fr");
    if (tri === "annee-asc") return a.annee - b.annee;
    return b.annee - a.annee;
  });

  return copie;
}
function afficherResultats(nombre) {
  const compteur = document.querySelector("#nombre-resultats");
  const messageVide = document.querySelector("#message-vide");

  compteur.textContent = nombre + " résultat(s)";
  messageVide.hidden = nombre > 0;
}
function supprimerLivre(id) {
  if (!confirm("Voulez-vous vraiment supprimer ce livre ?")) {
    return;
  }

  livres = livres.filter(function (livre) {
    return livre.id !== id;
  });
    sauvegarderLivres();
    actualiserAffichage();
}
 
  function genererId() {
  const ids = livres.map(function (livre) {
    return livre.id;
  });
  return Math.max(0, ...ids) + 1;
}

function lireFormulaire() {
  return {
    id: genererId(),
    titre: document.querySelector("#titre").value.trim(),
    auteur: document.querySelector("#auteur").value.trim(),
    annee: Number(document.querySelector("#annee").value),
    categorie: document.querySelector("#categorie").value,
    disponible: document.querySelector("#disponible").checked
  };
}
function afficherErreur(champ, message) {
  document.querySelector("#erreur-" + champ).textContent = message;
}

function validerFormulaire() {
  const livre = lireFormulaire();
  const anneeMax = new Date().getFullYear();
  const erreurs = { titre: "", auteur: "", annee: "", categorie: "" };

  if (livre.titre.length < 2) {
    erreurs.titre = "Le titre doit contenir au moins 2 caractères.";
  }
   if (livre.auteur.length < 2) {
    erreurs.auteur = "L'auteur doit contenir au moins 2 caractères.";
  }
  if (livre.annee < 1450 || livre.annee > anneeMax) {
    erreurs.annee = "L'année doit être entre 1450 et " + anneeMax + ".";
  }
  
  if (!livre.categorie) {
    erreurs.categorie = "Veuillez choisir une catégorie.";
  }

  Object.keys(erreurs).forEach(function (champ) {
    afficherErreur(champ, erreurs[champ]);
  });

  return Object.values(erreurs).every(function (message) {
    return message === "";
  });
}

function ajouterLivre(evenement) {
  evenement.preventDefault();
    if (!validerFormulaire()) {
    return;
  }
  livres.push(lireFormulaire());
  evenement.target.reset();
  sauvegarderLivres();
  actualiserAffichage();
}
function actualiserAffichage() {
  const resultats = trierLivres(filtrerLivres(livres));
  afficherLivres(resultats);
  afficherResultats(resultats.length);
    document.querySelector("#bouton-reinitialiser").disabled =
    JSON.stringify(livres) === JSON.stringify(LIVRES_DEPART);
}

document.querySelector("#recherche").addEventListener("input", actualiserAffichage);
document.querySelector("#filtre-categorie").addEventListener("change", actualiserAffichage);
document.querySelector("#filtre-disponibles").addEventListener("change", actualiserAffichage);
document.querySelector("#tri").addEventListener("change", actualiserAffichage);
document.querySelector("#formulaire-livre").addEventListener("submit", ajouterLivre);
document.querySelector("#bouton-reinitialiser").addEventListener("click", reinitialiserLivres);

actualiserAffichage();