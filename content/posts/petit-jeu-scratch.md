---
title: "Un petit jeu pour apprendre avec Scratch"
seoTitle: "Apprendre à coder avec Scratch : un petit jeu"
description: "Scratch permet de programmer en assemblant des blocs colorés. On t'explique comment créer un petit jeu, idéal pour comprendre les bases de la logique de code."
date: "2026-12-27"
author: "andee-rakotovao"
category: "programmation"
image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwzfHxkJUMzJUE5dmVsb3BwZXVyJTIwY2xhdmllcnxlbnwwfDB8fHwxNzk1MTU5NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "closeup photo of computer keyboard"
updated: "2026-11-22"
sourcesConsultees: "2026-11-22"
---

***Scratch fait coder sans écrire une ligne de texte : tu assembles des blocs colorés dans le navigateur. Un petit jeu, où un personnage se déplace et réagit, permet de voir immédiatement ce que fait ton programme.***

<div class="essentiel">

**L'essentiel, si tu es pressé**

- **Scratch** fonctionne avec des blocs colorés à assembler, sans taper de code, directement dans le navigateur.
- Un **personnage qui se déplace** et réagit à une touche est le premier projet le plus efficace pour comprendre la logique de base.

</div>

Avant d'écrire du code, il est utile de comprendre la logique d'un programme : déclencher une action, répéter une boucle, tester une condition. Scratch, développé par le MIT, est conçu pour cela. Tu glisses des blocs plutôt que de taper du texte, et le résultat s'anime immédiatement à l'écran.

## C'est quoi, concrètement ?

Scratch est un environnement de **programmation visuelle**, accessible gratuitement dans un navigateur, sans rien installer. Chaque bloc coloré représente une instruction : déplacer un personnage, jouer un son, attendre, répéter. Tu les assembles comme des pièces de puzzle, en les emboîtant les uns sous les autres.

Les blocs sont rangés par catégorie et par couleur : mouvement en bleu, apparence en violet, événements en jaune, contrôle en orange. Cette organisation aide à retrouver rapidement le bloc dont tu as besoin, même sur un gros projet.

<div class="exemple">

**Un exemple concret**

Tu crées un jeu où un chat attrape des poissons qui tombent du ciel. Chaque poisson attrapé ajoute un point au score. Tu découvres ainsi les **boucles**, qui font tomber les poissons en continu. Tu découvres aussi les **conditions**, qui testent si le chat touche un poisson pour ajouter le point.

</div>

## Créer un jeu simple, pas à pas

1. Choisis un personnage, par exemple le chat proposé par défaut.
2. Ajoute un bloc « quand le drapeau vert est cliqué », dans la catégorie Événements, pour démarrer le programme.
3. Relie-le à un bloc « si touche flèche pressée, alors déplace », dans Contrôle et Mouvement, pour faire bouger le personnage.
4. Ajoute un second élément à attraper (un poisson, une pièce), qui réapparaît à une position aléatoire après chaque capture.
5. Crée une **variable** « score », et ajoute un point à chaque fois que le personnage touche l'élément.
6. Teste le jeu en entier, en appuyant sur le drapeau vert, avant d'ajouter une nouvelle fonction.

Avance une étape à la fois. Si quelque chose ne fonctionne pas, reviens au dernier bloc ajouté et vérifie son effet avant de continuer.

<div class="attention">

**Partage avec prudence**

Si tu publies ton projet sur la plateforme Scratch, ne donne aucune information personnelle dans le titre, la description ou les commentaires. Vérifie aussi les réglages de partage avant de publier.

</div>

## Les erreurs à éviter

**Empiler tous les blocs avant de tester.** Teste chaque nouvel ajout immédiatement. Un programme qui grossit sans contrôle devient difficile à corriger.

**Confondre « répéter » et « répéter indéfiniment ».** Le premier bloc s'arrête après un nombre de tours fixé, le second tourne en continu. Mélanger les deux bloque parfois le jeu sans message d'erreur clair.

**Oublier d'initialiser une variable.** Un score qui ne repart pas de zéro au lancement du jeu fausse la partie suivante. Ajoute un bloc qui remet le score à zéro au démarrage.

**Ignorer les messages visuels de Scratch.** Un bloc qui reste grisé ou qui ne s'emboîte pas signale souvent une catégorie ou un type de donnée incompatible.

## Les mots à connaître

<div class="lexique">

- **Bloc** : élément visuel qui représente une instruction, à glisser et assembler.
- **Événement** : déclencheur qui démarre une action, comme un clic ou une touche pressée.
- **Boucle** : bloc qui répète une action un nombre de fois donné, ou en continu.
- **Condition** : bloc qui teste une situation (« si... alors ») avant d'agir.
- **Variable** : case qui garde une valeur modifiable en cours de jeu, comme un score.

</div>

## Questions fréquentes

**Scratch est-il réservé aux enfants ?**
Non. Il sert aussi aux adultes qui veulent comprendre la logique de programmation avant d'écrire du code dans un vrai langage.

**Peut-on passer ensuite à un vrai langage de code ?**
Oui. Les notions apprises avec les blocs (boucles, conditions, variables) se retrouvent telles quelles dans des langages comme Python.

**Faut-il installer un logiciel pour utiliser Scratch ?**
Non, Scratch fonctionne dans le navigateur, sur le site officiel du MIT, sans aucune installation.

**Combien de temps pour créer un premier jeu ?**
Compte entre trente minutes et une heure pour un jeu simple comme celui décrit ici, une fois les blocs de base compris.

## Et maintenant ?

Pour les bases de la programmation, lis [C'est quoi la programmation, concrètement ?](/c-est-quoi-la-programmation/). Pour comprendre la notion d'algorithme derrière ton jeu, lis [C'est quoi un algorithme ?](/c-est-quoi-un-algorithme/). Pour continuer avec un vrai langage après Scratch, lis [Python, écrire son premier programme](/python-premier-programme/) et [Quel langage apprendre en premier ?](/quel-langage-apprendre-en-premier/).
