---
title: "C'est quoi le HTML et le CSS ?"
seoTitle: "HTML et CSS : c'est quoi et comment ça marche ?"
description: "HTML et CSS, c'est quoi ? Le HTML pose le contenu, le CSS gère l'apparence. Explication claire, avec balises et erreurs à connaître."
date: "2026-10-16"
author: "andee-rakotovao"
category: "programmation"
image: "/images/articles/html-css-c-est-quoi-hero.webp"
imageAlt: "Gros plan sur des lignes de code HTML"
updated: "2026-11-22"
sources:
  - titre: "MDN : mettre en forme le contenu avec CSS (apprendre le développement web)"
    url: "https://developer.mozilla.org/fr/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content"
  - titre: "MDN : syntaxe de base du HTML"
    url: "https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax"
sourcesConsultees: "2026-11-22"
---

***Une page web mélange deux langages que la plupart des visiteurs ne distinguent jamais, mais que chaque créateur de site doit comprendre. Le HTML pose le contenu, le CSS gère l'apparence, et les confondre bloque vite une mise en page.***

Le HTML indique ce qu'il y a dans une page : un titre, un paragraphe, une image. Le CSS indique comment cela s'affiche : couleurs, tailles, espacements. Les deux langages travaillent ensemble sur presque toutes les pages web, et la confusion entre les deux freine souvent une première mise en page.

<div class="essentiel">

**L'essentiel en 30 secondes**

Le HTML structure le contenu, le CSS décide de son apparence.

- Une balise HTML indique la nature d'un contenu, jamais sa couleur.
- Une règle CSS cible un élément et change seulement son affichage.
- Un fichier CSS externe garde le code plus facile à modifier.

</div>

## HTML et CSS, quelle différence concrète ?

Le HTML décrit la structure d'une page, le CSS décrit son style. `<h1>` marque un titre, `<p>` marque un paragraphe : ce sont des balises HTML. Une couleur, une police ou une taille relèvent toujours du CSS, jamais du HTML.

Ni l'un ni l'autre n'exécute de calcul ou de condition, à la différence d'un vrai [langage de programmation](/c-est-quoi-la-programmation/). Le HTML balise un contenu, le CSS le met en forme : aucun des deux ne traite de données.

Pense à une affiche de concert. Le texte de l'affiche correspond au **contenu HTML** : le nom du groupe, la date, le lieu. La couleur, la police et la mise en page correspondent au CSS. Changer la couleur de fond ne change pas un mot du texte affiché.

Cette séparation n'est pas qu'une habitude d'**intégrateurs web**. Elle évite de répéter la même mise en forme dans chaque page d'un site, et facilite un changement global de style.

## Pourquoi séparer structure et apparence

Un CSS séparé du HTML permet de changer tout le style d'un site depuis un seul fichier, sans toucher au contenu de chaque page. Un site de cent pages garde ainsi une apparence cohérente, modifiable en quelques lignes.

Cette séparation aide aussi l'**accessibilité**. Un lecteur d'écran, utilisé par une personne malvoyante, s'appuie sur la structure HTML. Il annonce un titre ou un lien, peu importe sa couleur à l'écran.

![Deux écrans affichant du code et un logiciel de retouche d'image](/images/articles/html-css-c-est-quoi-1.webp)

Un **moteur de recherche** lit aussi d'abord la structure HTML pour comprendre une page, avant de considérer son apparence visuelle. Un contenu bien balisé se comprend mieux, pour une machine comme pour une personne. Comprendre la différence entre le [front-end et le back-end](/front-back-fullstack/) situe mieux où s'arrête le rôle du HTML et du CSS sur un site complet.

## Comment lier ton CSS à une page HTML

Trois méthodes relient une règle CSS à une page. Un style en ligne, écrit directement sur une balise, convient pour un essai rapide mais complique vite la lecture. Un fichier externe convient le mieux à un vrai projet.

La première méthode écrit une règle directement sur la balise, via un attribut `style`. Rapide à tester, elle complique la maintenance dès que plusieurs pages partagent le même style.

La deuxième regroupe les règles dans une balise `<style>`, placée dans la partie `<head>` de la page. Elle convient pour une page unique, sans dépendance externe.

La troisième, la plus courante, place tout le CSS dans un fichier séparé, relié par une ligne `<link>` dans le `<head>`. Un [éditeur de code adapté](/vs-code-debutant/) facilite l'écriture et la relecture de ce fichier au fil du projet.

## Les balises et propriétés à connaître

Une poignée de balises et de propriétés couvrent déjà la majorité des pages simples.

| Élément | Rôle |
|---|---|
| `<h1>` à `<h6>` | Titres, du plus important au moins important |
| `<p>` | Paragraphe de texte |
| `<a>` | Lien vers une autre page |
| `<img>` | Image affichée dans la page |
| `<div>` | Bloc générique, souvent utilisé avec du CSS |
| `color` | Couleur du texte en CSS |
| `font-size` | Taille du texte en CSS |
| `margin` | Espace autour d'un élément en CSS |

Un sélecteur CSS désigne les éléments concernés par une règle : une balise, une **classe** ou un **identifiant**. Une classe cible plusieurs éléments similaires, un identifiant cible un seul élément précis sur toute la page.

![Un développeur qui code sur deux écrans dans un bureau lumineux](/images/articles/html-css-c-est-quoi-2.webp)

<div class="exemple">

**Un exemple concret**

Un bouton « Commander » reçoit la classe `bouton-principal`. La règle CSS associée fixe un fond vert et un texte blanc. Chaque bouton qui porte cette classe adopte le même style, sans réécrire la règle à chaque fois.

</div>

Écrire [ta première page complète](/creer-premiere-page-web/) permet de tester ces balises et propriétés sur un cas réel, plutôt que sur des extraits isolés.

## Les erreurs qui cassent un affichage

Oublier une balise fermante casse souvent le reste d'une page, parfois loin de l'endroit où l'erreur se trouve vraiment. Vérifier chaque ouverture et chaque fermeture évite ce genre de souci.

Confondre classe et identifiant pose aussi problème : un identifiant ne doit apparaître qu'une seule fois par page, sinon le CSS cible un élément imprévu. Une classe, elle, se répète sans limite.

Une règle trop générale, comme un sélecteur qui cible toutes les balises `<div>` d'un coup, finit par toucher des **éléments imprévus**. Vérifier l'affichage dans le navigateur après chaque changement, plutôt qu'à la fin, repère vite ce genre d'**effet secondaire**. Des [tests réguliers sur ton code](/tests-automatises-pourquoi/) limitent ce risque à mesure qu'un projet grossit.

## Après le HTML et le CSS, la suite logique

Le HTML et le CSS affichent une page, mais ils ne la rendent pas interactive à eux seuls. Un clic qui déclenche une action, un formulaire vérifié avant envoi ou une animation déclenchée au défilement demandent du **JavaScript**.

Une fois une page terminée, elle doit aussi être visible en ligne. [Mettre une application ou un site en ligne](/mettre-application-en-ligne/) explique les étapes qui suivent la création des fichiers, de l'hébergement jusqu'au nom de domaine.

Les bases du HTML et du CSS s'appliquent aussi sur WordPress ou un autre outil de création de site. Comprendre ces deux langages aide à corriger un affichage, même sans tout coder à la main.

## FAQ

### Faut-il apprendre le HTML avant le CSS ?

Oui, dans cet ordre logique. Le HTML pose d'abord la structure d'une page, le CSS vient ensuite mettre en forme cette structure déjà posée.

### Peut-on faire un site avec seulement du HTML ?

Oui. Un site simple tient en HTML seul, mais garde une apparence basique : polices par défaut, aucune couleur personnalisée, aucune mise en page travaillée.

### Quelle est la différence entre une classe et un identifiant en CSS ?

Une classe s'applique à plusieurs éléments d'une page. Un identifiant cible un seul élément précis et ne doit jamais se répéter ailleurs sur la même page.

### Le CSS ralentit-il l'affichage d'une page ?

Un fichier CSS bien écrit a un effet négligeable sur la vitesse. Un CSS mal organisé, avec des règles répétées ou trop générales, peut compliquer l'affichage sur de grosses pages.

### Où apprendre le HTML et le CSS gratuitement ?

La documentation MDN sert de référence fiable, gratuite et disponible en français, avec des exemples que tu peux tester directement dans le navigateur.

<div class="lexique">

- **Balise** : marqueur HTML, écrit entre chevrons, qui indique la nature d'un contenu.
- **Sélecteur** : partie d'une règle CSS qui désigne les éléments à mettre en forme.
- **Propriété CSS** : caractéristique d'affichage réglée par une règle, comme la couleur ou la taille.

</div>
