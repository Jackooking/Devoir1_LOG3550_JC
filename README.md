# Bibliothèque Numérique JC – LOG3550 Devoir 1

Dépôt Git : https://github.com/Jackooking/Devoir1_LOG3550_JC

## Description

Frontend d'un catalogue de bibliothèque, écrit en HTML, CSS et JavaScript pur, sans framework.
On peut consulter les livres, les rechercher, les filtrer, les trier, en ajouter et en supprimer.
Les changements sont gardés dans le navigateur grâce à `localStorage`.
Ce frontend sera relié à une API FastAPI dans le devoir 2.

## Structure du projet

```
index.html        page principale (catalogue et formulaire d'ajout)
css/styles.css    styles et mise en page adaptative
js/data.js        tableau des livres de départ (LIVRES_DEPART)
js/app.js         affichage, recherche, filtres, tri, ajout, suppression, sauvegarde
README.md
```

## Mode d'emploi

1. Ouvrir `index.html` dans un navigateur récent (Chrome, Firefox ou Edge). Aucune installation n'est nécessaire.
2. **Rechercher** : taper un titre ou un auteur dans le champ de recherche. Les résultats se mettent à jour à chaque lettre, sans tenir compte des majuscules ni des accents (`rosee` trouve « rosée »).
3. **Filtrer** : choisir une catégorie et/ou cocher « Disponibles seulement ». Les filtres fonctionnent ensemble et avec la recherche.
4. **Trier** : choisir un tri par titre (A à Z, Z à A) ou par année (croissant, décroissant).
5. Le nombre de résultats s'affiche au-dessus des cartes, et un message apparaît quand aucun livre ne correspond.
6. **Ajouter** : remplir le formulaire « Ajouter un livre » puis cliquer sur « Ajouter ». Le titre et l'auteur doivent avoir au moins 2 caractères, l'année doit être entre 1450 et l'année en cours, et une catégorie doit être choisie. Les erreurs s'affichent sous chaque champ.
7. **Supprimer** : cliquer sur « Supprimer » sur une carte, puis confirmer.
8. **Réinitialiser** : remet les livres de départ. Le bouton est désactivé tant que la liste n'a pas été modifiée.

Les ajouts et les suppressions sont conservés après un rechargement de la page.

## Choix de conception

- **HTML sémantique** : `header`, `nav`, `main`, deux `section`, `footer`, un seul `h1`. Chaque champ a un `label` associé et la page se parcourt au clavier.
- **Cartes générées en JavaScript** avec `createElement` à partir du tableau de livres, jamais écrites à la main dans le HTML.
- **Liste de travail séparée** : `LIVRES_DEPART` ne change jamais ; l'application travaille sur une copie (`livres`), ce qui permet au bouton « Réinitialiser » de revenir à l'état de départ.
- **Une seule fonction d'affichage** (`actualiserAffichage`) : elle filtre, trie, affiche les cartes et met à jour le compteur. Toutes les actions l'appellent, ce qui évite de dupliquer du code.
- **CSS mobile d'abord** : une colonne par défaut, deux colonnes à partir de 600 px, trois à partir de 992 px, avec CSS Grid.
- **Variables CSS** dans `:root` pour les couleurs et les espacements, avec des contrastes vérifiés (ratio d'au moins 4.5:1).
- **États visibles** : `:hover` sur les boutons et les cartes, `:focus-visible` pour la navigation au clavier, style pour le bouton désactivé, étiquettes « Disponible » et « Emprunté » de couleurs différentes.
- **Accessibilité des erreurs** : chaque champ est relié à son message d'erreur avec `aria-describedby`, et les messages sont annoncés avec `aria-live`. Le nombre de résultats est aussi annoncé.

## Difficultés rencontrées

<!-- À écrire avec tes propres mots : ce qui t'a bloqué et comment tu l'as résolu. -->

## Réponses aux questions

### 1. Pourquoi les balises sémantiques sont-elles préférables à une suite de div ?

Utiliser des balises sémantiques au lieu de tout mettre en <div>, ça change tout pour notre code. Côté accessibilité, les lecteurs d'écran s'en servent pour guider facilement les utilisateurs grâce à <nav>, <main> ou <footer>. Pour le référencement, les moteurs de recherche captent beaucoup mieux la structure et le rôle de chaque bloc. Pour la maintenance, c'est tellement plus clair et propre de lire <footer> qu'un abstrait <div class="x">. Bref, ça donne du sens à notre travail et ça rend le site beaucoup plus pro.

### 2. Quelle est la différence entre map, filter et forEach ? Lesquels ai-je utilisés pour la recherche et le filtrage ?

D'abord, forEach, ça sert juste à parcourir les éléments un par un pour faire une action (comme les afficher), mais ça ne renvoie rien du tout. Ensuite, map, il transforme chaque élément du tableau de départ et te recrée un nouveau tableau de la même taille avec les résultats. Enfin, filter, il teste chaque élément avec une condition et te renvoie un nouveau tableau mais filtré, avec uniquement ceux qui ont validé le test.
Du coup, pour notre code, j'ai utilisé filter pour garder uniquement les livres qui correspondent à la recherche et aux filtres, et j'ai utilisé forEach juste après pour passer sur ce nouveau tableau et afficher chaque carte de livre à l'écran.

## Captures

Les captures sont jointes dans le dossier `captures/` de l'archive ZIP :

1. `01-validation-w3c.png` : validation W3C sans erreur
2. `02-ecran-large.png` : écran large (1200 px, trois colonnes)
3. `03-tablette.png` : tablette (768 px, deux colonnes)
4. `04-telephone.png` : téléphone (375 px, une colonne)

## Sources et outils d'assistance

- **Claude (assistant d'IA d'Anthropic)** : utilisé pour m'expliquer les notions (HTML sémantique, DOM, `filter`/`map`/`forEach`, `localStorage`, CSS Grid et `@media`), me guider étape par étape, relire mon code et m'aider à corriger mes erreurs. Il a aussi rédigé une première version de ce README (description, mode d'emploi, choix de conception), que j'ai relue.
- [Validateur W3C](https://validator.w3.org/) : validation du HTML.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) : vérification du contraste des couleurs.
- [MDN Web Docs](https://developer.mozilla.org/fr/) : documentation HTML, CSS et JavaScript.
- Aucune bibliothèque externe et aucune image n'ont été utilisées.
