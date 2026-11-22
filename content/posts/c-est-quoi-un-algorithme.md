---
title: "C'est quoi un algorithme ?"
seoTitle: "Algorithme : c'est quoi, en clair ?"
description: "Un algorithme est une suite d'étapes claires pour résoudre un problème. On t'explique l'idée avec des exemples du quotidien, avant tout code."
date: "2026-12-21"
author: "andee-rakotovao"
category: "programmation"
image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwyfHxjb2RlJTIwb3JkaW5hdGV1ciUyMCVDMyVBOWNyYW58ZW58MHwwfHx8MTc5NTE1OTY5MXww&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "a computer screen with a bunch of code on it"
updated: "2026-11-22"
---

Tu entends ce mot partout, du fil d'actualité aux recettes de cuisine, en passant par les résultats de recherche. Un algorithme est pourtant une idée simple : une suite d'étapes précises qui mène à un résultat. Ce guide explique l'idée, avec des exemples du quotidien, avant toute notion de code.

<div class="essentiel">

**L'essentiel en 30 secondes**

Un algorithme est une suite d'instructions claires, données dans un ordre précis, pour résoudre un problème. Une recette de cuisine ou un itinéraire fonctionnent déjà comme des algorithmes. Un programme informatique n'est, au fond, qu'un algorithme écrit dans un langage que la machine comprend.

</div>

## C'est quoi un algorithme, concrètement ?

Le mot vient d'un mathématicien persan du Moyen Âge, Al-Khwârizmî. Aujourd'hui, il désigne toute méthode qui découpe un problème en étapes simples, suivies dans un ordre précis. Tu en utilises souvent sans le savoir, quand tu prépares un trajet ou ranges tes courses.

Une **recette de cuisine** décrit des ingrédients et une succession d'actions. Si l'ordre change, le plat ne sera pas le même. Un **itinéraire** fonctionne de la même façon : tourne à gauche, avance de deux cents mètres, prends la deuxième rue. Chaque étape doit être compréhensible sans qu'il faille deviner quoi que ce soit.

<div class="exemple">

**Un exemple concret**

Pour trouver le plus grand nombre d'une liste, un algorithme simple peut être : prends le premier nombre comme référence. Compare chaque nombre suivant à cette référence. Si un nombre est plus grand, il devient la nouvelle référence. À la fin de la liste, la référence est la réponse.

</div>

## Pourquoi l'informatique a besoin d'algorithmes

Un ordinateur ne comprend pas une demande floue comme « fais-moi un bon résumé ». Il faut lui donner des étapes très précises : lire le texte, repérer les phrases importantes, les classer par ordre d'importance, puis les assembler. C'est l'algorithme qui rend cette tâche possible, avant même d'écrire une seule ligne de code.

Un programme informatique n'est, au fond, qu'un algorithme traduit dans un **langage de programmation**, pour que la machine puisse l'exécuter. L'algorithme vient d'abord, sur papier ou dans la tête. Le code vient ensuite, comme une traduction fidèle de cette méthode.

## Les trois briques que tout algorithme utilise

Presque tous les algorithmes, du plus simple au plus complexe, s'appuient sur les mêmes briques de base.

**La séquence.** Les étapes sont suivies dans l'ordre, l'une après l'autre. Changer l'ordre change souvent le résultat.

**La condition.** L'algorithme choisit quoi faire selon la situation, avec une règle du type « si… alors… sinon ». Par exemple : si le nombre est plus grand, alors il devient la référence.

**La boucle.** L'algorithme répète une action plusieurs fois, sans qu'on ait à l'écrire à chaque fois. Par exemple : pour chaque nombre de la liste, compare-le à la référence.

## Plusieurs méthodes pour un même problème

Un problème n'a presque jamais une seule solution possible. Pour trier une liste de noms par ordre alphabétique, plusieurs algorithmes existent, avec des méthodes et des vitesses différentes.

| Caractéristique | Algorithme simple | Algorithme optimisé |
|---|---|---|
| Facilité à comprendre | Élevée | Plus technique |
| Vitesse sur peu de données | Suffisante | Souvent identique |
| Vitesse sur beaucoup de données | Lente | Nettement plus rapide |
| Usage courant | Apprentissage, petits projets | Grands sites, grandes bases de données |

Ce tableau résume une idée simple : le bon algorithme dépend de la taille du problème, pas seulement du résultat final. Un moteur de recherche ou un réseau social traitent des millions de données, donc la vitesse compte énormément. Pour trier les dix contacts d'un petit carnet d'adresses, la différence ne se verrait même pas.

<div class="attention">

**Un algorithme n'est pas toujours parfait**

Un algorithme peut être juste mais lent, ou rapide mais mal adapté aux données qu'il traite. Le but est d'abord qu'il donne le bon résultat, puis qu'il le fasse efficacement. Un résultat faux obtenu rapidement reste un résultat faux.

</div>

## Où tu croises des algorithmes sans y penser

- Ton application de cartes calcule le chemin le plus rapide entre deux adresses.
- Un réseau social choisit l'ordre des publications qui s'affichent dans ton fil.
- Un site de vente te propose des produits proches de ceux que tu as déjà regardés.
- Ta boîte mail trie les messages indésirables du reste de ton courrier.
- Une playlist automatique enchaîne des morceaux qui te ressemblent.

Ces algorithmes reposent souvent sur l'**intelligence artificielle**, une approche qui apprend des règles à partir d'exemples plutôt que de suivre des instructions écrites d'avance. Pour comprendre cette différence, lis [C'est quoi, l'intelligence artificielle ?](/intelligence-artificielle-guide-debutants/).

## Les erreurs à éviter

- **Croire qu'un algorithme est forcément du code.** Tu peux le décrire entièrement avec des phrases simples, sur papier, avant d'écrire quoi que ce soit.
- **Penser qu'il n'existe qu'une seule bonne méthode.** Plusieurs algorithmes peuvent résoudre le même problème, avec des résultats justes mais des vitesses différentes.
- **Confondre rapidité et exactitude.** Un algorithme rapide qui donne un mauvais résultat ne sert à rien.
- **Sauter l'étape du papier.** Décrire les étapes avant de coder évite de nombreuses erreurs une fois dans le langage de programmation.

## Les mots à connaître

<div class="lexique">

**Algorithme** : suite d'étapes précises qui mène à un résultat, avant même d'être écrite dans un langage de programmation.

**Instruction** : action élémentaire que la machine peut exécuter.

**Séquence** : des étapes suivies dans l'ordre, l'une après l'autre.

**Condition** : test qui décide quelle étape suivre, par exemple « si le nombre est plus grand ».

**Boucle** : répétition d'étapes tant qu'une condition reste vraie.

**Langage de programmation** : langue dans laquelle on traduit un algorithme pour qu'une machine l'exécute.

</div>

## Questions fréquentes

### Faut-il savoir coder pour comprendre un algorithme ?

Non. Tu peux le décrire avec des phrases simples ou sur papier. Le code vient ensuite, comme une traduction de cette méthode.

### Un algorithme est-il toujours le même pour un problème donné ?

Non. Plusieurs algorithmes peuvent résoudre le même problème, avec des méthodes et des vitesses différentes selon la quantité de données.

### Les intelligences artificielles utilisent-elles des algorithmes ?

Oui, mais leur fonctionnement apprend des règles à partir d'exemples, ce qui les rend beaucoup plus complexes que ces exemples simples.

### Un algorithme peut-il se tromper ?

Oui, s'il est mal conçu ou appliqué à des données qu'il ne gère pas bien. Vérifier le résultat reste utile, même pour un algorithme réputé fiable.

## Et maintenant ?

Pour te lancer dans le code, lis [C'est quoi la programmation, concrètement ?](/c-est-quoi-la-programmation/). Pour choisir ton premier langage, lis [Quel langage de programmation apprendre en premier ?](/quel-langage-apprendre-en-premier/). Et pour voir un algorithme à l'œuvre dans une machine, découvre [C'est quoi un robot, exactement ?](/c-est-quoi-un-robot/).
