---
title: "Créer sa première page web"
seoTitle: "Créer sa première page web, pas à pas"
description: "Une page web se construit avec du HTML, un peu de CSS et beaucoup d'essais. On t'explique comment créer ta première page pas à pas."
date: "2026-12-25"
author: "andee-rakotovao"
category: "programmation"
image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHw0fHxjb2RlJTIwb3JkaW5hdGV1ciUyMCVDMyVBOWNyYW58ZW58MHwwfHx8MTc5NTE1OTY5MXww&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "Computer screen displaying HTML code for a web development project"
updated: "2026-11-22"
---

<div class="essentiel">

**L'essentiel en 30 secondes**

Une page web se construit avec un simple fichier texte écrit en **HTML**, affiché par ton navigateur. Un éditeur de texte gratuit et quelques balises suffisent pour voir ton premier résultat en quelques minutes.

</div>

Écrire une page web est souvent le premier vrai pas vers la programmation. Tu verras ton texte prendre forme dans le navigateur, et cette récompense est immédiate. Pas de compilation, pas d'installation lourde, juste un fichier et un double clic.

## C'est quoi, concrètement ?

Une page web est un fichier que ton navigateur sait lire et afficher. Le **HTML** indique ce qu'il y a dans la page : un titre, un paragraphe, une image, une liste. Le **CSS** indique ensuite comment tout cela s'affiche : les couleurs, les tailles, les espaces entre les blocs.

Pense à une maison. Le HTML pose les murs et les pièces : ici le salon, là la chambre. Le CSS choisit la peinture, les rideaux et la disposition des meubles. Sans CSS, la maison tient debout, mais elle reste grise et austère.

<div class="exemple">

**Un exemple concret**

Une personne crée une page qui présente son club de lecture. Elle écrit le nom du club en titre, une phrase d'accueil, puis la liste des prochains livres. Elle ajoute une couleur de fond douce avec une feuille de style simple. Sa page tient dans un seul fichier, et elle la partage par e-mail à ses amis.

</div>

## Les outils nécessaires

Il te faut seulement un éditeur de texte et un navigateur déjà installé sur ton ordinateur. [VS Code](/vs-code-debutant/) est un bon choix de logiciel dédié au code. Crée un dossier pour ton projet, puis un fichier nommé `index.html`. Ouvre-le ensuite dans le navigateur par un double clic : tu vois immédiatement le résultat, sans rien installer de plus.

## Comment faire, pas à pas

1. **Écris la structure de base.** Une déclaration de type (`<!DOCTYPE html>`), une balise `<html>`, et un titre dans l'en-tête `<head>`.
2. **Ajoute un titre principal et un paragraphe.** Utilise une balise `<h1>` pour le titre, et `<p>` pour le texte de présentation.
3. **Insère une liste à puces.** Une balise `<ul>` qui contient plusieurs `<li>`, par exemple tes centres d'intérêt.
4. **Enregistre, puis rafraîchis la page** dans le navigateur pour voir le résultat.
5. **Ajoute une couleur de fond** avec une feuille de style simple, liée à ta page par une balise `<link>`.
6. **Structure visuellement** avec des balises comme `<header>`, `<main>` et `<footer>`, qui rendent ta page plus claire à lire pour toi et pour les moteurs de recherche.

Pour comprendre en détail le rôle de chaque langage derrière ces balises, lis [c'est quoi le HTML et le CSS ?](/html-css-c-est-quoi/)

<div class="attention">

**Enregistre souvent**

On oublie souvent d'enregistrer le fichier avant de rafraîchir la page. Si rien ne change dans le navigateur, vérifie d'abord la sauvegarde avant de chercher une erreur ailleurs.

</div>

## Les erreurs à éviter

- **Oublier de fermer une balise.** Une balise ouverte sans sa fermeture (`</p>`, `</div>`) peut casser l'affichage de toute la page qui suit.
- **Mélanger guillemets simples et doubles.** Reste cohérent dans tes attributs, par exemple `class="intro"`, pour éviter des erreurs difficiles à repérer.
- **Vouloir tout apprendre d'un coup.** Commence par une page simple, fais-la fonctionner, puis ajoute une nouveauté à la fois.
- **Copier du code sans le comprendre.** Teste chaque ligne ajoutée pour savoir ce qu'elle change réellement dans la page.

## Les mots à connaître

<div class="lexique">

- **HTML** : langage qui structure le contenu d'une page web.
- **CSS** : langage qui décrit l'apparence de la page.
- **Balise** : mot entre chevrons qui indique le rôle d'un élément, comme `<p>` pour un paragraphe.
- **Navigateur** : logiciel qui lit le code et affiche la page, comme Chrome ou Firefox.

</div>

## Questions fréquentes

**Faut-il payer un hébergement pour une première page ?**
Non, tu peux la tester entièrement sur ton ordinateur. Pour la [mettre en ligne](/mettre-application-en-ligne/) et la partager par une adresse, il faudra un hébergement, parfois gratuit, à choisir avec soin.

**Dois-je connaître JavaScript tout de suite ?**
Non. Le HTML et le CSS suffisent pour une première page. JavaScript ajoute ensuite des comportements interactifs, comme un bouton qui réagit au clic.

**Mon navigateur affiche une page vide ou cassée, que faire ?**
Vérifie les balises ouvertes et fermées, ainsi que les guillemets. La plupart de ces erreurs viennent d'un oubli de ce type, facile à corriger une fois repéré.

**Un outil sans code peut-il remplacer cet apprentissage ?**
Pour un site rapide, oui : regarde notre guide [peut-on créer un site sans savoir coder ?](/creer-site-sans-savoir-coder/) Mais écrire toi-même ta page t'apprend des bases utiles pour la suite.

## Et maintenant ?

Pour aller plus loin après cette première page, regarde [quel langage de programmation apprendre en premier](/quel-langage-apprendre-en-premier/) et [VS Code, prendre en main l'éditeur de code](/vs-code-debutant/). Si tu préfères un outil sans code pour aller plus vite, lis [peut-on créer un site sans savoir coder ?](/creer-site-sans-savoir-coder/)
