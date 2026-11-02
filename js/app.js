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

  carte.append(titre, auteur, annee, categorie, etat);
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
function actualiserAffichage() {
  const resultats = trierLivres(filtrerLivres(LIVRES_DEPART));
  afficherLivres(resultats);
  afficherResultats(resultats.length);
}

document.querySelector("#recherche").addEventListener("input", actualiserAffichage);
document.querySelector("#filtre-categorie").addEventListener("change", actualiserAffichage);
document.querySelector("#filtre-disponibles").addEventListener("change", actualiserAffichage);
document.querySelector("#tri").addEventListener("change", actualiserAffichage);

actualiserAffichage();