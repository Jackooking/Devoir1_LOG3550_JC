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

afficherLivres(LIVRES_DEPART);