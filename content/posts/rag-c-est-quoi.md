---
title: "C'est quoi un RAG, et à quoi ça sert ?"
seoTitle: "RAG en IA : c'est quoi, en clair ?"
description: "Le RAG permet à une IA de chercher dans tes documents avant de répondre. On t'explique le principe, les usages concrets et les limites."
date: "2026-11-01"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
image: "https://images.unsplash.com/photo-1762330470070-249e7c23c8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
imageAlt: "Interface numérique affichant une invite de recherche « demandez n'importe quoi »"
updated: "2026-11-22"
---

<div class="essentiel">

**L'essentiel en 30 secondes**

Le RAG (génération augmentée par récupération) fait chercher l'IA dans tes documents avant qu'elle réponde, plutôt que de la laisser deviner. Ça rend ses réponses plus fiables sur des informations récentes ou privées, mais la réponse reste à vérifier.

</div>

Un modèle de langage ne connaît que ce qu'il a appris pendant son entraînement. Il ignore donc le contenu de ton contrat de travail, le règlement de ton association ou la notice de ton four. Le RAG ajoute une **étape de recherche** avant la réponse, pour que l'IA s'appuie sur un texte précis plutôt que sur sa seule mémoire.

## C'est quoi, concrètement ?

Le RAG est une technique qui combine deux outils : un moteur de recherche et un modèle de langage. Avant de répondre, le système va chercher les passages utiles dans une base de documents. Ces passages sont ensuite transmis à l'IA, qui rédige sa réponse à partir de ce texte précis.

Cette méthode règle un problème connu des modèles de langage seuls : ils **inventent parfois une réponse** plausible mais fausse, faute d'information. Un bon RAG réduit ce risque. L'IA a sous les yeux un texte réel à citer, au lieu de compléter un trou dans sa mémoire.

<div class="exemple">

**Un exemple concret**

Une association range son règlement intérieur dans un outil de questions-réponses. Un adhérent demande : « Quel est le délai pour annuler mon inscription ? » Le système retrouve l'article correspondant, et l'IA répond en citant ce passage. Si le règlement ne dit rien sur le sujet, une bonne installation doit répondre que l'information n'est pas trouvée, plutôt que d'inventer une règle.

</div>

## Comment ça marche, étape par étape

Un RAG suit toujours la même logique, qu'il interroge dix pages ou dix mille.

1. Les documents sont **découpés** en petits morceaux de texte, assez courts pour rester précis.
2. Chaque morceau est transformé en une suite de nombres qui représente son sens. Ces morceaux sont rangés dans un **index**, une sorte de fichier de recherche très rapide.
3. Quand tu poses une question, le système retrouve les morceaux **les plus proches** de ta demande, souvent trois à dix passages.
4. Ces morceaux sont transmis à l'IA, qui **rédige sa réponse** à partir d'eux, sans improviser le reste.

L'IA ne devine donc plus autant. Elle lit les passages pertinents avant de parler, un peu comme un étudiant qui révise sur sa fiche plutôt que de réciter de mémoire.

## À quoi ça sert, dans la vraie vie ?

Le RAG équipe surtout des outils professionnels : bases de connaissances d'entreprise, assistants de service client, ou moteurs de recherche internes. Il peut aussi te servir directement, si tu as des documents personnels à interroger en langage courant, sans tout relire toi-même.

Pour comprendre comment ces systèmes automatisent des tâches entières, lis notre guide [C'est quoi un agent IA, au juste ?](/agent-ia/). Le RAG et l'agent IA sont souvent combinés dans les mêmes outils.

## Les erreurs à éviter

Ces erreurs reviennent souvent, aussi bien chez les particuliers que dans les entreprises qui installent un RAG.

- **Faire confiance sans vérifier la source.** Une réponse qui cite un passage n'est pas automatiquement exacte : le passage cité peut être mal choisi.
- **Négliger la mise en page des documents.** Un tableau, une image ou un document scanné sont parfois mal découpés et mal lus par le système.
- **Oublier de mettre à jour la base.** Un document modifié après l'indexation n'est pas pris en compte tant que l'index n'est pas reconstruit.
- **Envoyer des documents confidentiels sans vérifier où ils sont stockés.** Lis les conditions d'utilisation avant d'y glisser des données sensibles.

<div class="attention">

**Attention à tes données**

Avant d'envoyer des documents confidentiels à un service en ligne, vérifie où ils sont stockés et qui peut y accéder. Pour les bons réflexes côté sécurité, lis aussi [C'est quoi, la cybersécurité ?](/c-est-quoi-la-cybersecurite/).

</div>

## Les mots à connaître

<div class="lexique">

**RAG** : technique qui ajoute une recherche dans des documents avant la réponse de l'IA.

**Index** : organisation des documents qui permet de retrouver vite les passages utiles.

**Source** : passage ou document sur lequel la réponse s'appuie.

**Modèle de langage** : programme d'IA entraîné pour comprendre et produire du texte.

</div>

## Questions fréquentes

### Le RAG remplace-t-il l'entraînement du modèle ?

Non. Le modèle reste le même. Le RAG lui fournit simplement des informations supplémentaires au moment de la question, sans toucher à son entraînement initial.

### Un RAG peut-il se tromper ?

Oui. Il peut retrouver un mauvais passage ou mal interpréter un texte juste. D'où l'intérêt de toujours vérifier la source citée avant d'agir sur une réponse.

### Faut-il savoir programmer pour utiliser un RAG ?

Pas forcément. Certains outils grand public proposent cette fonction sans code, en te laissant simplement glisser des fichiers. Pour le construire soi-même, il faut des bases de programmation.

### Le RAG fonctionne-t-il avec n'importe quel type de document ?

Il fonctionne mieux avec du texte structuré. Les scans de mauvaise qualité ou les mises en page complexes réduisent la qualité des réponses.

## Et maintenant ?

Pour automatiser des tâches avec l'IA, lis [C'est quoi un agent IA, au juste ?](/agent-ia/). Pour formuler des demandes claires, lis [Comment écrire un bon prompt pour ChatGPT ?](/prompt-chatgpt/). Si tu te demandes pourquoi une IA se trompe parfois même avec un RAG, regarde [Quelle confiance accorder à la réponse d'une IA ?](/confiance-reponse-ia/).
