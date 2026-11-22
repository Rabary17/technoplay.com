---
title: "Peut-on faire tourner une IA sur son propre ordinateur ?"
seoTitle: "IA sur son ordinateur : c'est possible ?"
description: "Certains modèles d'IA tournent en local, sans envoyer tes données en ligne. On t'explique ce qu'il faut et les limites à connaître."
date: "2026-11-05"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHw1fHxyJUMzJUE5c2VhdSUyMGRlJTIwbmV1cm9uZXMlMjB0ZWNobm9sb2dpZXxlbnwwfDB8fHwxNzk1MTU5NzE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "an abstract image of a sphere with dots and lines"
updated: "2026-11-22"
---

<div class="essentiel">

**L'essentiel en 30 secondes**

Oui : des logiciels gratuits comme Ollama ou LM Studio font tourner un modèle d'IA directement sur ton ordinateur, sans connexion internet. Tes données restent sur ta machine, mais un modèle local répond généralement moins bien qu'un grand service en ligne.

</div>

Quand tu utilises un assistant en ligne comme ChatGPT ou Claude, tes questions partent vers des serveurs distants. En local, le modèle est téléchargé sur ton ordinateur et répond depuis ta propre machine. Tu peux même travailler sans connexion internet, une fois le modèle installé.

## C'est quoi, concrètement ?

Faire tourner une IA « en local » veut dire que le calcul se fait chez toi. Le travail se fait avec ta carte graphique ou ton processeur, plutôt que sur un serveur distant. Le modèle, un fichier de plusieurs gigaoctets, reste stocké sur ton disque. Rien de ce que tu écris ne quitte ta machine, sauf si tu le décides toi-même.

<div class="exemple">

**Un exemple concret**

Tu veux corriger des textes personnels sans les envoyer en ligne. Un petit modèle installé sur ton portable, comme un **Llama 3.2** ou un **Gemma 3** de quelques milliards de paramètres, suffit pour reformuler des phrases. Pour analyser un long rapport avec des tableaux, tu auras besoin d'un modèle plus grand, donc d'une machine plus puissante.

</div>

## Ce qu'il faut à ton ordinateur

Il n'y a pas de chiffre unique, car tout dépend du modèle choisi. Les modèles plus petits, autour d'un à quatre milliards de paramètres, tournent sur des machines ordinaires, mais répondent moins bien aux questions complexes. Les plus gros, au-delà de 30 milliards de paramètres, demandent une carte graphique récente et beaucoup de mémoire.

Vérifie trois choses avant de te lancer :

- la **mémoire vive** de ton ordinateur, car le modèle doit y tenir en entier pendant qu'il travaille ;
- la présence d'une **carte graphique compatible**, qui accélère beaucoup les réponses ;
- la **place libre sur ton disque**, de 2 à 10 Go par modèle pour les tailles courantes.

| Mémoire de ton ordinateur | Taille de modèle réaliste | Usage adapté |
|---|---|---|
| 8 Go | 1 à 4 milliards de paramètres | Reformuler, corriger, résumer un texte court |
| 16 Go | 7 à 8 milliards de paramètres | Rédaction, résumé, questions générales |
| 32 Go et plus | 12 milliards ou davantage | Textes plus longs, un peu de code |

Les Mac à puce Apple (M1 et suivants) partagent la mémoire entre le processeur et la partie graphique, ce qui en fait de bonnes machines pour l'IA locale, même sans carte graphique dédiée.

## Les avantages et les limites

En local, tes données ne quittent pas ton ordinateur, et tu n'es facturé ni à la requête ni à l'abonnement. En revanche, les réponses sont souvent moins bonnes que celles des grands services en ligne, surtout sur les questions qui demandent beaucoup de connaissances ou un raisonnement complexe. L'installation demande un peu de technique, et les mises à jour du modèle sont à faire toi-même.

Un modèle local ignore aussi l'actualité récente, puisqu'il n'a pas accès à internet une fois lancé. Il excelle sur le travail de texte que tu lui fournis toi-même : reformuler, résumer, corriger.

<div class="attention">

**Télécharge depuis des sources officielles**

Un modèle ou un logiciel trouvé sur un site inconnu peut contenir un programme malveillant. Télécharge uniquement depuis le site du projet, comme ollama.com ou lmstudio.ai, ou depuis Hugging Face, la grande plateforme de partage de modèles ouverts. Lis la licence avant d'utiliser un modèle, surtout pour un usage professionnel.

</div>

## Les erreurs à éviter

**Choisir un modèle trop gros pour sa machine.** Il saturera ta mémoire et répondra avec une lenteur décourageante. Commence par une taille adaptée à ta configuration.

**Attendre les mêmes performances qu'un service en ligne.** Un modèle local de quelques milliards de paramètres reste loin des plus grands modèles fermés sur les tâches complexes.

**Négliger la mise à jour du logiciel.** Ollama et LM Studio évoluent régulièrement, avec de meilleures performances et de nouveaux modèles pris en charge.

**Installer trop de modèles d'un coup.** Chacun occupe plusieurs gigaoctets sur le disque. Supprime ceux que tu n'utilises plus.

## Les mots à connaître

<div class="lexique">

- **En local** : le calcul se fait sur ton propre ordinateur, sans passer par un serveur distant.
- **Carte graphique (GPU)** : composant qui accélère beaucoup les calculs d'une IA.
- **Modèle allégé** : version réduite d'un modèle, plus légère et plus rapide, adaptée à une machine modeste.
- **Paramètres** : valeurs internes d'un modèle qui déterminent ses réponses ; plus il y en a, plus le modèle est en principe capable.

</div>

## Questions fréquentes

### Est-ce gratuit ?

Oui pour la plupart des logiciels et des modèles destinés à un usage personnel. Lis la licence avant de t'en servir pour un usage professionnel, car certaines conditions varient.

### Un ordinateur portable suffit-il ?

Oui, pour des modèles légers de quelques milliards de paramètres. Pour des tâches plus lourdes, un ordinateur fixe avec une bonne carte graphique est plus adapté.

### Faut-il savoir coder ?

Pas toujours. Des logiciels comme LM Studio proposent une interface graphique simple. D'autres, comme Ollama, demandent de lancer des commandes, ce qui reste accessible avec un peu de patience.

### Quel est l'intérêt par rapport à ChatGPT ou Claude ?

La confidentialité et l'absence de coût à l'usage. En contrepartie, les réponses sont généralement moins précises que celles des grands modèles en ligne.

## Et maintenant ?

- [Installer une IA sur son ordinateur avec Ollama ou LM Studio](/installer-ia-locale-ollama-lm-studio/)
- [Où tourne une IA : cloud, ordinateur ou téléphone ?](/ou-tourne-une-ia-cloud-ordinateur-telephone/)
- [Les paramètres d'une IA, c'est quoi ?](/parametres-modele-ia/)
- [C'est quoi un modèle de langage ?](/modele-de-langage-c-est-quoi/)
- [Quels outils d'IA tester en premier ?](/top10-outils-ia-debutants/)
