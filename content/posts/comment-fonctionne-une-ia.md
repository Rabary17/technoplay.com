---
title: "Comment fonctionne une IA ? Ses composants comparés à ceux d'un ordinateur"
seoTitle: "Comment fonctionne une IA ? La comparaison avec un PC"
description: "Données, réseau de neurones, GPU, fenêtre de contexte, outils : comment fonctionne une IA, pièce par pièce, comparée à ton ordinateur."
date: "2026-11-02"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
sources:
  - titre: "IBM : What is a neural network?"
    url: "https://www.ibm.com/think/topics/neural-networks"
  - titre: "NVIDIA : What's the Difference Between a CPU and a GPU?"
    url: "https://blogs.nvidia.com/blog/whats-the-difference-between-a-cpu-and-a-gpu/"
  - titre: "NVIDIA : What's the Difference Between Deep Learning Training and Inference?"
    url: "https://blogs.nvidia.com/blog/difference-deep-learning-training-inference-ai/"
  - titre: "Vaswani et al., « Attention Is All You Need » (2017)"
    url: "https://arxiv.org/abs/1706.03762"
sourcesConsultees: "2026-11-02"
---

***Pour comprendre comment fonctionne une IA, le plus parlant est de la comparer à l'ordinateur que tu as sous les yeux. Disque dur, processeur, mémoire vive : chaque pièce a son équivalent.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- Une IA compte cinq pièces : données, réseau de neurones, puces de calcul, mémoire de travail et outils.
- Elle vit deux phases : l'entraînement, long et coûteux, puis l'utilisation au quotidien, qu'on appelle l'inférence.
- La comparaison avec un ordinateur aide à comprendre, mais elle a ses limites : une IA ne range pas ses connaissances comme des fichiers.

</div>

Tu tapes une question dans ChatGPT, et une réponse s'affiche en quelques secondes. Entre les deux, des milliers de puces se sont mises au travail dans un centre de données. Ce qui se passe dans cette boîte noire paraît mystérieux. Pourtant, chaque élément a un cousin dans ton PC.

## Les données : le disque dur de l'IA

Sur ton ordinateur, le **disque dur** stocke tout ce que tu as accumulé : photos, documents, programmes. Une IA a aussi sa matière première, ce sont ses **données d'entraînement**. Pour un assistant comme ChatGPT, Claude ou Gemini, il s'agit d'immenses quantités de textes : pages web, livres, articles, code informatique.

La comparaison s'arrête vite, et c'est instructif. Ton disque dur garde chaque fichier intact et le restitue à l'identique. Une IA, elle, ne conserve pas ses données une fois entraînée. Elle n'a pas de dossier « Wikipédia » qu'elle ouvrirait pour te répondre.

Elle a lu ces textes pour en extraire des régularités. Quels mots vont ensemble ? Comment construit-on un raisonnement, une recette ou une lettre ? C'est pour ça qu'elle peut se tromper sur une date précise. Elle n'a pas l'information sous la main, elle la **reconstruit** à partir de ce qu'elle a appris.

## Le réseau de neurones : le cerveau de la machine

Dans un ordinateur, rien ne ressemble à un cerveau : il exécute les programmes qu'on lui donne. Une IA, elle, a un **réseau de neurones artificiels**. C'est un très grand programme mathématique, organisé en couches successives, qui transforme une entrée (ta question) en sortie (sa réponse).

Chaque connexion entre deux neurones porte un nombre, appelé **paramètre** ou poids. Les grands modèles en comptent des centaines de milliards. Pendant l'entraînement, ces nombres sont ajustés des milliards de fois, jusqu'à ce que le réseau donne des réponses justes.

Le savoir de l'IA se trouve là, dans ces poids, et non dans un fichier lisible. À la fin, un modèle d'IA n'est qu'un énorme tableau de nombres. Les assistants actuels utilisent une architecture précise, le **Transformer**, présentée par Google en 2017. Son mécanisme principal consiste à prédire le mot suivant, ce que détaille notre article [Qu'est-ce qu'un modèle de langage ?](/modele-de-langage-c-est-quoi/).

## Les GPU : le processeur de l'IA

Le **processeur** (CPU) de ton ordinateur est un excellent généraliste. Il enchaîne des tâches variées très vite, mais une à une, ou presque. Il compte quelques cœurs puissants, en général entre 4 et 16 sur un ordinateur grand public.

Une IA a surtout besoin de faire la même opération simple, des multiplications, sur des millions de nombres à la fois. C'est le terrain de jeu des **GPU**, les cartes graphiques. Conçues au départ pour afficher les jeux vidéo, elles regroupent des milliers de petits cœurs qui travaillent en parallèle.

<div class="exemple">

**Un exemple concret**

Imagine corriger 10 000 copies d'un QCM. Un professeur très rapide les corrige une par une : c'est le CPU. Mille correcteurs qui en prennent chacun dix finissent bien avant lui : c'est le GPU. Les calculs d'une IA ressemblent à ce QCM, avec des milliards de copies.

</div>

Les géants de l'IA alignent des dizaines de milliers de ces puces dans des centres de données. C'est l'une des raisons pour lesquelles les cartes de NVIDIA, leader du secteur, s'arrachent.

## La fenêtre de contexte : la mémoire vive

La **mémoire vive** (RAM) de ton ordinateur garde les programmes ouverts et les documents en cours. Quand tu éteins la machine, elle se vide. Une IA a un équivalent : la **fenêtre de contexte**. C'est tout ce qu'elle a sous les yeux pendant votre échange : ta question, les messages précédents, les documents que tu lui as envoyés.

Cette mémoire de travail a une taille limite, mesurée en **tokens**, des morceaux de mots. Certains modèles récents annoncent jusqu'à un million de tokens, soit l'équivalent de plusieurs romans. Quand une conversation dépasse la limite, les éléments les plus anciens sortent de la fenêtre. L'IA semble alors « oublier » le début de l'échange.

Comme la RAM, cette mémoire se vide à la fin de la conversation. Si un assistant se souvient de toi d'une fois sur l'autre, c'est grâce à une fonction de mémoire à part. Elle enregistre quelques informations et les remet dans la fenêtre de contexte au début de chaque nouvel échange.

## Les outils : les périphériques de l'IA

Sans clavier, écran ni connexion à Internet, ton ordinateur ne servirait pas à grand-chose. Les **périphériques** le relient au monde extérieur. Une IA a les siens : les **outils**. Recherche sur le web, calculatrice, exécution de code, lecture de fichiers, envoi d'un e-mail ou pilotage d'un navigateur.

Seul, un modèle de langage ne peut qu'écrire du texte à partir de ce qu'il a appris. Il ne connaît pas l'actualité et calcule mal les grands nombres. Les outils comblent ces trous. Quand tu demandes la météo de demain, l'assistant lance une recherche, lit le résultat, puis rédige sa réponse.

Ce sont ces outils qui transforment un chatbot en **agent**, capable d'enchaîner plusieurs actions pour accomplir une tâche. Le modèle décide quel outil utiliser et quand. Mais c'est un programme classique, à côté, qui exécute l'action et lui renvoie le résultat.

## Entraînement et inférence : les deux vies d'une IA

Ton ordinateur a été fabriqué en usine avant d'arriver chez toi. Une IA suit un parcours comparable, en deux temps bien distincts.

L'**entraînement**, c'est l'usine. Le réseau de neurones lit ses données et ajuste ses paramètres pendant des semaines, voire des mois. Cette phase mobilise des milliers de GPU et coûte des dizaines, voire des centaines de millions de dollars pour les plus grands modèles. À la fin, les paramètres sont figés.

L'**inférence**, c'est l'usage au quotidien. Chaque fois que tu poses une question, le modèle figé calcule une réponse, sans rien apprendre de nouveau sur le fond. Une requête coûte peu, mais les assistants en traitent des centaines de millions par jour. C'est pour ça qu'un modèle ignore les événements postérieurs à son entraînement, sauf s'il fait une recherche sur le web.

## Ordinateur et IA : le tableau de correspondance

| Ordinateur | IA | Ce qu'il faut retenir |
|---|---|---|
| Disque dur | Données d'entraînement | L'IA les lit pour apprendre, puis ne les garde pas telles quelles |
| Programme | Réseau de neurones et ses paramètres | Le savoir est dans des milliards de nombres, pas dans des fichiers |
| Processeur (CPU) | Puces de calcul (GPU) | Des milliers de petits cœurs qui calculent en parallèle |
| Mémoire vive (RAM) | Fenêtre de contexte | La mémoire de la conversation, limitée et vidée à la fin |
| Périphériques | Outils | Recherche web, code, fichiers : le lien avec le monde extérieur |
| Fabrication en usine | Entraînement | Long, coûteux, fait une seule fois par version |
| Utilisation au quotidien | Inférence | Chaque réponse à une question |

<div class="lexique">

**Les mots à connaître**

- **Paramètre** : nombre réglé pendant l'entraînement, qui porte une partie du savoir du modèle.
- **GPU** : puce de calcul faite pour traiter beaucoup d'opérations simples en même temps.
- **Fenêtre de contexte** : tout ce que l'IA peut prendre en compte pendant une conversation.
- **Token** : morceau de mot, l'unité que l'IA lit et écrit.
- **Inférence** : utilisation d'un modèle déjà entraîné pour produire une réponse.

</div>

## Questions fréquentes

### Une IA a-t-elle besoin d'Internet pour fonctionner ?

Pas forcément. Le modèle n'a besoin que de ses paramètres et d'une machine assez puissante. Mais les assistants grand public tournent sur des serveurs distants, et ton application doit s'y connecter.

### Pourquoi les IA utilisent-elles des cartes graphiques ?

Parce que les calculs d'un réseau de neurones sont des multiplications répétées sur d'énormes tableaux de nombres. Les GPU les traitent en parallèle, des dizaines de fois plus vite qu'un processeur classique.

### Une IA apprend-elle de mes conversations ?

Pas en direct : ses paramètres ne changent pas pendant que tu discutes. En revanche, certains éditeurs peuvent utiliser les conversations pour entraîner les versions suivantes. Vérifie ce réglage dans les paramètres de confidentialité de ton compte.

### Quelle est la différence entre un modèle et un assistant ?

Le modèle, c'est le réseau de neurones et ses paramètres. L'assistant, comme ChatGPT, l'entoure d'une interface, d'une mémoire, d'outils et de règles de sécurité.

## La suite de la série

Tu as vu les pièces de la machine. L'article précédent de la série retrace [l'histoire de l'intelligence artificielle, de Turing à GPT-6](/histoire-intelligence-artificielle/). Le prochain s'intéresse au token, l'unité qui fait lire, retenir et payer une IA.
