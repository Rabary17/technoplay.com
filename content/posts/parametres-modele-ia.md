---
title: "Paramètres d'une IA : que signifient 8B, 70B ou 1 000 milliards ?"
seoTitle: "Paramètres d'une IA : que veulent dire 8B ou 70B ?"
description: "8B, 70B, 1 000 milliards : ce que mesurent les paramètres d'une IA, la mémoire qu'ils exigent, et pourquoi la taille ne fait pas tout."
date: "2026-11-02"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
sources:
  - titre: "Mistral AI : Introducing Mistral Large 4 (octobre 2026)"
    url: "https://mistral.ai/news/mistral-large-4/"
  - titre: "Mistral AI : documentation du modèle Mistral Large 4"
    url: "https://docs.mistral.ai/models/mistral-large-4-0.md"
  - titre: "OpenAI : GPT-4 Technical Report (2023)"
    url: "https://arxiv.org/abs/2303.08774"
  - titre: "Brown et al., « Language Models are Few-Shot Learners » (GPT-3, 2020)"
    url: "https://arxiv.org/abs/2005.14165"
  - titre: "Meta : The Llama 3 Herd of Models (2024)"
    url: "https://arxiv.org/abs/2407.21783"
sourcesConsultees: "2026-11-02"
---

***Llama 8B, Qwen 72B, Mistral Large 4 à 1 000 milliards : les paramètres d'une IA s'affichent partout, souvent sans explication. Ce chiffre mesure la taille du modèle, sa gourmandise en mémoire et, en partie seulement, son niveau.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- Un paramètre est un nombre réglé pendant l'entraînement. « 8B » signifie 8 milliards de paramètres, car B veut dire billion, soit un milliard en anglais.
- Les modèles récents distinguent les paramètres totaux et les paramètres actifs, réellement utilisés pour chaque mot.
- Plus de paramètres demande plus de mémoire et de puissance, mais ne garantit pas un meilleur modèle.

</div>

Sur les sites spécialisés, les noms de modèles ressemblent à des références de pièces détachées : 8B, 70B, 405B, A52B. Ces lettres et ces chiffres disent beaucoup de choses. Ils indiquent si un modèle tient dans ton téléphone, dans ton ordinateur ou seulement dans un centre de données. Ils ne disent pas tout de sa qualité.

## C'est quoi, un paramètre d'IA ?

Un modèle d'IA est un réseau de neurones artificiels, organisé en couches. Chaque connexion entre deux neurones porte un nombre, appelé **paramètre** ou **poids**. Ce nombre indique l'importance d'un signal pour le neurone suivant.

Au début de l'entraînement, ces nombres sont tirés au hasard. Le modèle produit alors n'importe quoi. Pendant des semaines, un algorithme les ajuste des milliards de fois, jusqu'à ce que le réseau prédise correctement la suite des textes. Le détail de ce chantier est raconté dans [comment on fabrique un modèle d'IA](/comment-fabrique-modele-ia/).

À la fin, tout ce que le modèle sait se trouve dans ces nombres. Il n'y a pas de base de données cachée, pas de fiches rangées par sujet. Le modèle livré n'est qu'un **fichier de paramètres**, accompagné d'un programme pour faire les calculs. C'est pour ça qu'on mesure la taille d'un modèle à son nombre de paramètres, comme on mesure un disque dur à sa capacité.

## 8B, 70B, 1T : comment lire ces chiffres

Les noms des modèles viennent de l'anglais. La lettre **B** signifie « billion », qui veut dire **milliard** en français, et non billion. Un modèle « 8B » compte donc 8 milliards de paramètres, et un « 70B » en compte 70 milliards.

La lettre **T**, pour « trillion », désigne **mille milliards**. Un modèle « 1T » compte environ 1 000 milliards de paramètres. Attention au faux ami : en français, un billion vaut mille milliards. Les articles mal traduits mélangent parfois les deux.

<div class="exemple">

**Un exemple concret**

Meta a publié Llama 3.1 en trois tailles : 8B, 70B et 405B. Le premier compte 8 milliards de paramètres, le dernier 405 milliards, soit cinquante fois plus. Pour comparer, GPT-3, sorti en 2020, en comptait 175 milliards. Le fichier du plus gros Llama pèse environ 800 gigaoctets avant compression.

</div>

Ces suffixes servent surtout à situer un modèle dans une gamme. Un éditeur sort souvent la même famille en plusieurs tailles, du petit modèle rapide au grand modèle plus fin. À toi de choisir selon ton matériel et ton besoin.

## Paramètres totaux et paramètres actifs

Les grands modèles récents utilisent souvent une architecture appelée **mélange d'experts**, ou MoE en anglais. Le réseau est découpé en dizaines de sous-réseaux spécialisés, les « experts ». Pour chaque token à produire, un aiguilleur n'en active que quelques-uns.

Il faut alors distinguer deux chiffres. Les **paramètres totaux** mesurent la taille du fichier et la mémoire nécessaire pour le charger. Les **paramètres actifs** mesurent le calcul réellement fait à chaque mot, donc la vitesse et le coût d'utilisation.

Mistral Large 4, présenté par Mistral AI en octobre 2026, illustre bien la différence. Il compte environ **1 000 milliards de paramètres au total**, 1,05 billion selon sa documentation. Mais seuls **une cinquantaine de milliards** sont actifs pour chaque token : 49 ou 52 milliards selon la façon de compter. Il faut donc d'énormes serveurs pour le stocker, mais chaque réponse coûte autant de calcul qu'un modèle classique vingt fois plus petit. C'est ce que signale la mention « A52B » dans certains de ses noms techniques.

## Pourquoi OpenAI ne publie pas la taille de ses modèles

Jusqu'à GPT-3, OpenAI publiait l'architecture de ses modèles, nombre de paramètres compris. Depuis GPT-4, en 2023, l'entreprise garde ces informations pour elle. Son rapport technique l'écrit noir sur blanc : il ne donne aucun détail sur l'architecture, y compris la taille du modèle.

OpenAI invoque deux raisons : la concurrence et la sécurité. Révéler la recette aiderait les concurrents à copier les choix techniques. Google et Anthropic suivent la même ligne pour Gemini et Claude.

Résultat : les chiffres qui circulent sur la taille de GPT-4, GPT-5 ou GPT-6 sont des estimations, parfois fantaisistes. Méfie-toi d'un article qui annonce un nombre de paramètres précis pour un modèle fermé. À l'inverse, les éditeurs de modèles ouverts, comme Meta, Mistral AI, DeepSeek ou Alibaba avec Qwen, publient leurs tailles. Ils le doivent, puisque chacun peut télécharger le fichier et compter.

## Quelle mémoire et quel matériel pour chaque taille ?

Pour faire tourner un modèle, il faut charger tous ses paramètres en mémoire. Le calcul est simple : chaque paramètre occupe 2 octets en pleine précision, et environ un demi-octet une fois compressé sur 4 bits. Un modèle de 8 milliards de paramètres demande donc 16 Go, ou 5 Go compressé.

| Taille du modèle | Mémoire en pleine précision | Mémoire compressée (4 bits) | Matériel typique |
|---|---|---|---|
| 1 à 3 milliards | 2 à 6 Go | 1 à 2 Go | Smartphone récent |
| 7 à 8 milliards | Environ 16 Go | Environ 5 Go | Ordinateur portable avec 16 Go de mémoire |
| 30 à 35 milliards | Environ 65 Go | Environ 20 Go | Carte graphique de 24 Go ou Mac avec 32 Go |
| 70 milliards | Environ 140 Go | Environ 40 Go | Station avec 48 Go de mémoire graphique ou Mac avec 64 Go |
| 400 milliards et plus | 800 Go et plus | 230 Go et plus | Serveur avec plusieurs GPU |
| 1 000 milliards | Environ 2 To | Environ 550 Go | Centre de données |

Ajoute une marge de 10 à 30 % pour la conversation en cours, qui occupe aussi de la mémoire. La compression sur 4 bits fait perdre un peu de qualité, souvent peu visible pour un usage courant. Où et comment faire tourner ces modèles, c'est le sujet d'un prochain article de la série.

## Plus gros ne veut pas toujours dire meilleur

Pendant quelques années, la règle semblait simple : plus de paramètres, plus d'intelligence. Elle a ses limites. En 2022, des chercheurs de DeepMind ont montré qu'un modèle plus petit, entraîné sur beaucoup plus de données, battait des modèles quatre fois plus gros.

Depuis, la qualité des données, la durée d'entraînement et les réglages après coup pèsent autant que la taille. Un modèle de 8 milliards de paramètres sorti en 2026 dépasse souvent un modèle de 175 milliards de 2020. La **distillation**, qui apprend à un petit modèle à imiter un grand, accélère ce rattrapage.

Pour toi, le bon modèle est celui qui répond bien à ton usage avec le matériel dont tu disposes. Un petit modèle rapide, installé sur ton ordinateur, suffit à résumer un texte ou reformuler un e-mail. Pour un raisonnement complexe ou du code difficile, les grands modèles des services en ligne gardent une nette avance.

<div class="lexique">

**Les mots à connaître**

- **Paramètre (ou poids)** : nombre réglé pendant l'entraînement, qui porte une partie du savoir du modèle.
- **B (billion)** : milliard en anglais. Un modèle 70B compte 70 milliards de paramètres.
- **Mélange d'experts (MoE)** : architecture qui n'active qu'une partie du modèle pour chaque token.
- **Paramètres actifs** : paramètres réellement utilisés pour produire chaque token.
- **Quantification** : compression des paramètres sur moins de bits, pour réduire la mémoire nécessaire.

</div>

## Questions fréquentes

### Que veut dire 7B dans le nom d'un modèle d'IA ?

7B signifie 7 milliards de paramètres. Le B vient de l'anglais « billion », qui veut dire milliard. Un tel modèle tient, une fois compressé, dans un ordinateur portable récent avec 16 Go de mémoire.

### Combien de paramètres a ChatGPT ?

On ne sait pas. Depuis GPT-4, OpenAI ne publie plus la taille de ses modèles. Les chiffres qui circulent sont des estimations non confirmées.

### Un modèle avec plus de paramètres est-il plus intelligent ?

Pas forcément. La qualité des données et de l'entraînement compte autant. Un petit modèle récent bat souvent un modèle bien plus gros sorti quelques années plus tôt.

### Quelle différence entre paramètres et tokens ?

Les paramètres forment le modèle lui-même, fixé après l'entraînement. Les tokens sont les morceaux de texte qu'il lit et écrit. On entraîne un modèle de quelques milliards de paramètres sur des milliers de milliards de tokens.

## La suite de la série

Tu sais maintenant lire la fiche technique d'un modèle. L'article précédent explique [comment on fabrique un modèle d'IA](/comment-fabrique-modele-ia/), étape par étape. Le suivant présente les entreprises qui les fabriquent : OpenAI, Anthropic, Google, Mistral, DeepSeek et les autres.
