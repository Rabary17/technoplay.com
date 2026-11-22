---
title: "Home Assistant, c'est quoi ?"
seoTitle: "Home Assistant : c'est quoi, en clair ?"
description: "Home Assistant réunit les appareils de la maison dans une seule interface. On t'explique à quoi il sert, pour qui et ce qu'il demande."
date: "2026-12-15"
author: "mialy-andriaharisoa"
category: "maison-connectee"
image: "https://images.unsplash.com/photo-1595678816704-9c82fbe792ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwyfHxvYmpldHMlMjBjb25uZWN0JUMzJUE5cyUyMGludCVDMyVBOXJpZXVyfGVufDB8MHx8fDE3OTUxNTk3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "black and white pendant lamp"
updated: "2026-11-22"
---

<div class="essentiel">

**L'essentiel en 30 secondes**

Home Assistant est un logiciel gratuit et open source qui réunit tes appareils connectés, de marques différentes, dans un seul tableau de bord. Il peut tourner en local, sans dépendre des serveurs des fabricants, mais demande plus de temps à mettre en place qu'une application classique.

</div>

Une maison connectée peut vite devenir un casse-tête : une application pour les ampoules, une autre pour la caméra, une troisième pour le thermostat. Home Assistant regroupe tout cela dans une seule interface, et permet de créer des règles qui relient les appareils entre eux, peu importe leur marque d'origine.

## C'est quoi, concrètement ?

Home Assistant est une plateforme domotique open source, installée sur un petit ordinateur chez toi plutôt que sur les serveurs d'un fabricant. Elle se connecte à des centaines de marques d'appareils grâce à des **intégrations**. Une intégration est un module qui fait le lien entre Home Assistant et un produit précis.

<div class="exemple">

**Un exemple concret**

Une personne veut que les lumières du couloir s'allument doucement la nuit, uniquement si un mouvement est détecté et si la porte d'entrée est fermée. Une application de marque unique ne permet pas toujours de combiner ces conditions. Avec Home Assistant, la règle se construit à partir de plusieurs capteurs, même s'ils viennent de fabricants différents.

</div>

Contrairement à une appli fournie par un fabricant, Home Assistant ne t'oblige pas à envoyer tes données vers un cloud extérieur. L'essentiel du traitement peut rester sur ta machine, un atout pour la confidentialité et pour continuer à piloter ta maison en cas de panne internet.

## Comment faire, pas à pas

1. **Choisis ton matériel.** Un Raspberry Pi, un petit boîtier dédié comme Home Assistant Green, ou un vieil ordinateur suffisent pour démarrer.
2. **Installe Home Assistant OS**, la version la plus simple à prendre en main, fournie en image prête à copier sur une carte mémoire.
3. **Accède à l'interface** depuis un navigateur, sur le réseau local, puis crée ton compte administrateur.
4. **Ajoute tes appareils** un par un, via les intégrations proposées : ampoules, prises, caméras, capteurs de porte ou de mouvement.
5. **Construis un premier scénario simple**, comme éteindre les lumières à une heure fixe, avant de viser des règles plus complexes.
6. **Sauvegarde ta configuration** régulièrement, pour pouvoir revenir en arrière si un réglage casse une fonction importante.

## Lequel choisir selon ton cas ?

- **Tu veux juste piloter quelques appareils d'une même marque** : l'application du fabricant suffit largement, sans installation supplémentaire.
- **Tu mélanges plusieurs marques et tu veux des règles qui les combinent** : Home Assistant devient utile, à condition d'accepter une prise en main plus longue.
- **Tu veux garder tes données hors du cloud d'un fabricant** : Home Assistant en local répond directement à ce besoin.
- **Tu débutes tout juste dans la maison connectée** : commence par un ou deux appareils simples avant d'envisager Home Assistant, comme expliqué dans [notre guide pour bien commencer](/par-quoi-commencer-maison-connectee/).

<div class="attention">

**Ne bricole pas sans sauvegarde**

Avant de modifier une configuration, fais une copie de sauvegarde. Une erreur de réglage peut couper une fonction importante, comme la commande d'une porte ou d'un détecteur de fumée.

</div>

## Les erreurs à éviter

**Se lancer sans plan.** Ajoute tes appareils un par un, en testant chaque intégration avant de passer à la suivante.

**Oublier les mises à jour.** Home Assistant évolue vite. Une version trop ancienne peut perdre la compatibilité avec certaines intégrations.

**Négliger la compatibilité réseau.** Vérifie que tes appareils suivent un protocole courant, comme [Matter](/matter-standard-maison-connectee/), Zigbee ou Wi-Fi, avant l'achat.

**Confondre complexité et utilité.** Un scénario trop ambitieux dès le départ décourage vite. Commence simple, puis complexifie au fil du temps.

## Les mots à connaître

<div class="lexique">

- **Automatisation** : règle qui déclenche une action selon une condition, comme une heure ou un mouvement détecté.
- **Tableau de bord** : écran qui regroupe les commandes et les informations de tous les appareils connectés.
- **Intégration** : module logiciel qui connecte Home Assistant à un appareil ou à un service précis.
- **Local** : fonctionnement sur un appareil situé chez toi, sans passer par les serveurs d'un fabricant.

</div>

## Questions fréquentes

### Faut-il savoir programmer pour l'utiliser ?

Pas pour les usages simples, qui passent par des menus. Pour des règles avancées, quelques notions de logique et de configuration aident beaucoup.

### Home Assistant est-il gratuit ?

Oui, le logiciel lui-même est libre et gratuit. Seul le matériel sur lequel il tourne, et certains services additionnels optionnels, peuvent avoir un coût.

### Faut-il un bon niveau technique pour débuter ?

Un niveau de base suffit, à condition d'avancer par étapes et de tester chaque règle avant d'en ajouter une autre.

### Home Assistant fonctionne-t-il sans internet ?

Oui, pour l'essentiel. Les automatisations locales continuent de fonctionner sans connexion. Seules certaines intégrations qui dépendent d'un service en ligne s'arrêtent en cas de coupure.

## Et maintenant ?

- [Économiser l'énergie avec une maison connectée](/economiser-energie-maison-connectee/)
- [C'est quoi une maison connectée ?](/c-est-quoi-une-maison-connectee/)
- [Matter, le standard qui unifie la maison connectée](/matter-standard-maison-connectee/)
- [Faire communiquer ses appareils sans passer par le cloud](/communiquer-sans-cloud/)
- [Par quoi commencer : ampoule, prise ou enceinte ?](/par-quoi-commencer-maison-connectee/)
