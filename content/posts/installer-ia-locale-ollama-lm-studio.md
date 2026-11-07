---
title: "Installer une IA sur son ordinateur avec Ollama ou LM Studio"
seoTitle: "Installer une IA en local avec Ollama ou LM Studio"
description: "Installer une IA sur ton ordinateur avec Ollama ou LM Studio : le tutoriel, le modèle à choisir selon ta machine et les premiers tests."
date: "2026-11-02"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
sources:
  - titre: "Ollama : page de téléchargement"
    url: "https://ollama.com/download"
  - titre: "Ollama : bibliothèque de modèles"
    url: "https://ollama.com/library"
  - titre: "LM Studio : configuration requise"
    url: "https://lmstudio.ai/docs/app/system-requirements"
  - titre: "LM Studio : site officiel"
    url: "https://lmstudio.ai/"
sourcesConsultees: "2026-11-02"
---

***Installer une IA sur ton ordinateur prend une vingtaine de minutes avec Ollama ou LM Studio, deux logiciels gratuits. Tu obtiens un assistant qui fonctionne hors connexion et garde tes textes chez toi.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- LM Studio propose une interface graphique, idéale pour commencer. Ollama, plus léger, se pilote surtout en ligne de commande.
- Choisis la taille du modèle selon ta mémoire : environ 8 milliards de paramètres pour 16 Go, 14 milliards pour 32 Go.
- Télécharge les logiciels et les modèles uniquement depuis leurs sites officiels.

</div>

Tu as compris comment fonctionne une IA, ce que sont les paramètres et où tournent les modèles. Place à la pratique. En une soirée, tu peux avoir sur ton ordinateur un assistant qui résume, reformule et répond sans jamais envoyer un mot sur Internet. Il sera moins brillant que ChatGPT, mais il t'appartiendra.

## Avant de commencer : vérifie ta machine

Le point décisif, c'est la **mémoire vive**. Le modèle doit y tenir en entier pendant qu'il travaille. Sur Windows, ouvre le Gestionnaire des tâches (Ctrl + Maj + Échap), onglet Performances, puis Mémoire. Sur Mac, menu Pomme, puis « À propos de ce Mac ».

Une **carte graphique** accélère beaucoup les réponses. Sur un PC, une carte NVIDIA ou AMD avec au moins 4 Go de mémoire dédiée fait une vraie différence. Sur un Mac à puce Apple (M1 et suivants), la mémoire est partagée entre le processeur et la partie graphique. C'est un atout pour l'IA locale.

Prévois enfin de la **place sur le disque** : de 2 à 10 Go par modèle pour les tailles courantes. LM Studio exige un Mac à puce Apple avec macOS 14 ou plus récent. Sur PC, il faut un processeur compatible AVX2, ce qui est le cas de presque tous les modèles vendus depuis dix ans. Ollama fonctionne sur Windows, macOS et Linux.

Pour un tour d'horizon des usages et des limites avant de te lancer, lis [peut-on faire tourner une IA sur son propre ordinateur ?](/ia-sur-son-ordinateur/)

## Quel modèle choisir selon ta machine ?

La règle vient de notre article sur [les paramètres d'une IA](/parametres-modele-ia/) : un modèle compressé occupe environ un demi-octet par paramètre, plus une marge. Les logiciels proposent presque toujours ces versions compressées, notées Q4 ou « 4-bit ».

| Mémoire de ton ordinateur | Taille de modèle conseillée | Exemples de familles | Usage réaliste |
|---|---|---|---|
| 8 Go | 1 à 4 milliards | Llama 3.2 3B, Gemma 3 4B, Qwen3 4B | Reformuler, corriger, résumer un texte court |
| 16 Go | 7 à 8 milliards | Mistral 7B, Llama 3.1 8B, Qwen3 8B | Rédaction, résumé, questions générales |
| 32 Go | 12 à 14 milliards, voire 30 milliards | Gemma 3 12B, Qwen3 14B | Textes plus longs, un peu de code |
| 64 Go et plus | 70 milliards | Llama 3.3 70B | Proche des assistants en ligne, en plus lent |

Les noms et versions changent souvent. Les bibliothèques d'Ollama et de LM Studio affichent la taille de chaque fichier avant le téléchargement. Pour savoir qui publie ces modèles ouverts, relis [qui fabrique les IA](/entreprises-ia-openai-anthropic-google-mistral/).

Un conseil : commence petit. Un modèle trop gros pour ta mémoire ne plante pas toujours, mais il tourne avec une lenteur décourageante. Monte en taille seulement si la qualité te déçoit et que ta machine suit.

## Installer LM Studio, la méthode la plus simple

LM Studio ressemble à ChatGPT : une fenêtre de discussion, un menu pour choisir le modèle, des réglages accessibles à la souris. C'est la meilleure porte d'entrée si tu n'as jamais ouvert un terminal.

1. Va sur le site officiel, **lmstudio.ai**, et télécharge la version pour ton système.
2. Lance l'installateur et suis les étapes, comme pour n'importe quel logiciel.
3. Au premier démarrage, l'application propose souvent un modèle adapté à ta machine. Accepte, ou passe cette étape.
4. Ouvre l'onglet de recherche, symbolisé par une loupe. Tape le nom d'une famille, par exemple « qwen3 » ou « mistral ».
5. Choisis une version dont la taille correspond à ta mémoire, puis clique sur Télécharger.
6. Une fois le téléchargement terminé, ouvre l'onglet de discussion et sélectionne le modèle en haut de la fenêtre.

LM Studio signale les versions qui tiennent dans ta mémoire et celles qui risquent d'être trop lourdes. Les modèles viennent pour la plupart de **Hugging Face**, la grande plateforme de partage de modèles ouverts.

## Installer Ollama, la méthode légère

Ollama est un petit programme qui tourne en arrière-plan. Il plaît aux développeurs, car d'autres logiciels peuvent s'y brancher. Il propose aussi une fenêtre de discussion simple sur Windows et sur Mac.

1. Télécharge l'installateur sur **ollama.com/download**, puis lance-le.
2. Ouvre un terminal : « Terminal » sur Mac, « Invite de commandes » ou « PowerShell » sur Windows.
3. Tape la commande suivante, puis valide avec Entrée :

```
ollama run qwen3:8b
```

Ollama télécharge le modèle, quelques gigaoctets, puis ouvre une discussion directement dans le terminal. Tape ta question et valide. Pour quitter, écris `/bye`.

Remplace `qwen3:8b` par le nom de n'importe quel modèle de la bibliothèque, sur **ollama.com/library**. La commande `ollama list` affiche les modèles installés, et `ollama rm` suivi du nom en supprime un pour libérer de la place.

## Les premiers tests à faire

Une fois ton modèle lancé, teste-le sur des tâches réelles plutôt que sur des devinettes. Tu verras vite ce qu'il fait bien et ce qu'il rate.

<div class="exemple">

**Un exemple concret**

Copie un long e-mail reçu et demande : « Résume ce message en trois points et propose une réponse polie. » Puis coupe ton Wi-Fi et recommence. La réponse arrive toujours : la preuve que tout se passe sur ta machine.

</div>

Fais ensuite trois essais. Une **reformulation**, pour juger la qualité du français. Une **question de culture générale** dont tu connais la réponse, pour mesurer les erreurs. Une **demande longue**, comme le résumé d'un document de plusieurs pages, pour tester la vitesse et la mémoire.

Ne t'étonne pas des erreurs factuelles : un petit modèle connaît moins de choses qu'un grand. Il brille sur le travail de texte que tu lui fournis, beaucoup moins sur les connaissances encyclopédiques. Et il ignore l'actualité, puisqu'il n'a pas accès à Internet.

## Les erreurs à éviter

- **Télécharger un modèle trop gros.** Il saturera ta mémoire et répondra au ralenti. Commence par la taille conseillée dans le tableau.
- **Installer un logiciel trouvé sur un site inconnu.** Passe uniquement par lmstudio.ai, ollama.com et Hugging Face. Un faux installateur peut cacher un programme malveillant.
- **Croire que tout se passe en local dans n'importe quel outil.** Ollama et LM Studio calculent sur ta machine. Une extension ou une application tierce branchée dessus peut, elle, envoyer des données ailleurs. Lis ses conditions.
- **Oublier la licence.** Chaque modèle a ses règles, surtout pour un usage commercial. Elles figurent sur sa fiche.
- **Laisser les modèles s'accumuler.** Chacun occupe plusieurs gigaoctets. Supprime ceux que tu n'utilises plus.

<div class="lexique">

**Les mots à connaître**

- **Ollama** : logiciel gratuit qui télécharge et fait tourner des modèles d'IA en local, surtout en ligne de commande.
- **LM Studio** : logiciel gratuit avec une interface graphique pour chercher, installer et utiliser des modèles en local.
- **Hugging Face** : plateforme où chercheurs et entreprises publient leurs modèles ouverts.
- **Q4 ou 4-bit** : version compressée d'un modèle, quatre fois plus légère que l'original.
- **Terminal** : fenêtre où l'on tape des commandes au lieu de cliquer.

</div>

## Questions fréquentes

### Ollama ou LM Studio : lequel choisir ?

LM Studio si tu préfères cliquer : tout se fait à la souris. Ollama si tu veux un outil léger, ou brancher l'IA sur d'autres logiciels. Les deux sont gratuits et tu peux les installer côte à côte.

### Faut-il une carte graphique pour installer une IA en local ?

Non, mais elle accélère beaucoup les réponses. Sans carte graphique, un petit modèle tourne sur le processeur, plus lentement. Les Mac à puce Apple s'en sortent bien grâce à leur mémoire partagée.

### Une IA locale est-elle aussi bonne que ChatGPT ?

Pas pour les tâches complexes. Un modèle de 8 milliards de paramètres rédige et résume bien, mais il raisonne moins finement et se trompe plus souvent sur les faits.

### Est-ce gratuit ?

Oui, les logiciels et la plupart des modèles sont gratuits pour un usage personnel. Le seul coût, c'est ton matériel et un peu d'électricité.

### L'IA locale fonctionne-t-elle sans Internet ?

Oui. La connexion sert uniquement à télécharger le logiciel et le modèle. Ensuite, tout fonctionne hors ligne.

## La fin de la série

Ce tutoriel clôt la série « Comprendre l'IA ». L'article précédent explique [où tourne une IA](/ou-tourne-une-ia-cloud-ordinateur-telephone/) et pourquoi le local protège tes données. Pour reprendre depuis le début, commence par [l'histoire de l'intelligence artificielle](/histoire-intelligence-artificielle/).
