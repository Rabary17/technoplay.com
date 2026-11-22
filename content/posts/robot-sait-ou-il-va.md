---
title: "Comment un robot sait-il où il va ?"
seoTitle: "Comment un robot se repère dans l'espace"
description: "Capteurs, cartes et calculs : un robot se repère grâce à plusieurs outils combinés. On t'explique comment il sait où il est."
date: "2026-11-09"
author: "nekena-judicael"
category: "robotique-drones"
image: "https://images.unsplash.com/photo-1647940990395-967898eb0d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
imageAlt: "Un aspirateur robot posé sur le sol à côté d'un canapé"
updated: "2026-11-22"
---

***Un aspirateur robot contourne ton canapé, évite le chat et rentre tout seul à sa base. Derrière cette petite routine, il y a un travail de repérage bien organisé.***

<div class="essentiel">

**L'essentiel en 30 secondes**

Un robot combine plusieurs **capteurs** et une **carte** de son environnement pour savoir où il se trouve et planifier son trajet. Il se trompe parfois, surtout quand la pièce change ou que ses capteurs sont encrassés.

</div>

Un robot ne voit pas le monde comme toi. Il a besoin de mesures, de comparaisons et de calculs pour savoir où il est, et ce qu'il doit faire ensuite. Cette logique se retrouve dans les aspirateurs, les tondeuses et les véhicules autonomes.

## Les capteurs : ses yeux et ses oreilles

Les capteurs donnent au robot des informations sur son environnement. Une caméra repère des formes et des couleurs. Un capteur de distance mesure l'écart avec un mur ou un meuble. Un capteur de choc indique qu'il a heurté quelque chose. **Plus il y a de capteurs**, plus l'image qu'il se fait de son environnement est complète.

## La carte : où suis-je, et où est-ce que je vais ?

Pour se repérer, le robot compare ce qu'il perçoit avec une carte. Au départ, il peut la construire en explorant la pièce. Ensuite, il l'enregistre et la met à jour à chaque passage. Cette étape s'appelle la cartographie, et elle permet de savoir où il se trouve à l'intérieur de la carte.

Pour estimer ses déplacements, certains robots utilisent aussi les roues. Un petit capteur compte les tours de roue et calcule la distance parcourue. Ce calcul est précis au début, mais il s'accumule des petites erreurs au fil du temps.

<div class="exemple">

**Un exemple concret**

Un aspirateur robot part explorer le salon. Il note les murs, le canapé et la table. Quand il reçoit un choc contre un pied de chaise, il le signale sur sa carte, puis le contourne au passage suivant. Le lendemain, il connaît déjà la pièce et passe plus vite.

</div>

## Le calcul du trajet

Une fois la carte établie, le robot calcule un chemin pour couvrir la zone ou atteindre un point précis. Il choisit ensuite le mouvement qui lui permet de suivre ce chemin, tout en ajustant sa route à chaque obstacle.

## Pourquoi il se trompe parfois

Un robot peut se perdre si on déplace un meuble, si la lumière change beaucoup, ou si un capteur est sale. Les surfaces brillantes ou les tapis épais posent aussi problème. Nettoyer les capteurs et ranger les câbles au sol aide souvent à corriger ces erreurs.

<div class="lexique">

**Les mots à connaître**

- **Capteur** : composant qui mesure une information sur l'environnement.
- **Cartographie** : construction d'une carte de l'espace par le robot.
- **Odométrie** : estimation de la distance parcourue, à partir du mouvement des roues.

</div>

## Questions fréquentes

### Un robot a-t-il besoin du GPS ?

Pas à l'intérieur. Le signal GPS ne passe pas bien à travers les murs. Les robots d'intérieur s'appuient surtout sur leurs capteurs et leur carte.

### Peut-on voir la carte du robot ?

Oui, la plupart des applications associées affichent la carte. Tu peux souvent y définir des zones interdites ou nommer les pièces.

### Un robot peut-il se perdre pour de bon ?

Il peut se retrouver désorienté, mais la plupart des robots savent revenir à leur base. Si ce n'est pas le cas, une remise à zéro de la carte suffit souvent.

## Et maintenant ?

Pour découvrir un robot du quotidien, lis [Un aspirateur robot, ça vaut le coup ?](/aspirateur-robot-ca-vaut-le-coup/). Pour replacer ces idées dans le contexte général, lis [C'est quoi un robot, exactement ?](/c-est-quoi-un-robot/). Pour la différence entre un robot et un simple automate, lis [Robot, automate ou cobot : quelle différence ?](/robot-automate-cobot/). Pour voir ce que les robots à forme humaine savent faire, lis [Les robots humanoïdes, où en est-on ?](/robots-humanoides-ou-en-est-on/).
