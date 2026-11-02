---
title: "Où tourne une IA ? Sur un serveur, sur ton ordinateur ou sur ton téléphone"
seoTitle: "Où tourne une IA : cloud, ordinateur ou téléphone ?"
description: "Serveur, ordinateur ou téléphone : où tourne une IA, avec quels avantages pour la puissance, la confidentialité, le coût et la connexion."
date: "2026-11-02"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
sources:
  - titre: "Apple Security Research : Private Cloud Compute (2024)"
    url: "https://security.apple.com/blog/private-cloud-compute/"
  - titre: "Microsoft : Introducing Copilot+ PCs (mai 2024)"
    url: "https://blogs.microsoft.com/blog/2024/05/20/introducing-copilot-pcs/"
  - titre: "Android Developers : Gemini Nano"
    url: "https://developer.android.com/ai/gemini-nano"
sourcesConsultees: "2026-11-02"
---

***Quand tu interroges une IA, le calcul se fait dans un centre de données, sur ton ordinateur ou dans ton téléphone. Ce lieu change la puissance, la confidentialité, le coût et le besoin de connexion.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- Les grands assistants comme ChatGPT, Claude ou Gemini tournent sur des serveurs. L'application de ton téléphone n'est qu'une fenêtre vers eux.
- Des modèles plus petits peuvent tourner sur ton ordinateur ou ton téléphone, sans connexion et sans envoyer tes données.
- De plus en plus d'appareils mélangent les deux : les tâches simples en local, les plus lourdes sur un serveur.

</div>

Tu tapes une question dans l'application ChatGPT, dans le métro, et la réponse arrive en deux secondes. Ton téléphone n'a pourtant presque rien calculé. Ta question a parcouru des centaines de kilomètres jusqu'à un centre de données, puis la réponse a fait le chemin inverse. Ce n'est pas la seule façon de faire tourner une IA. Il en existe trois, avec chacune ses forces.

## Sur un serveur : la puissance du cloud

La grande majorité des assistants que tu utilises fonctionnent **dans le cloud**, c'est-à-dire sur des serveurs distants. Les modèles les plus puissants comptent des centaines de milliards de paramètres. Ils demandent des centaines de gigaoctets de mémoire et des puces spécialisées qu'aucun ordinateur personnel ne possède.

Ces serveurs sont regroupés dans d'immenses **centres de données**, gérés par les éditeurs ou par des hébergeurs comme Microsoft, Google ou Amazon. Chaque question y est traitée par des cartes graphiques qui servent des milliers d'utilisateurs à la fois. C'est ce partage qui rend possible une version gratuite.

Les avantages sont nets : la meilleure qualité de réponse, des mises à jour automatiques, et aucun matériel à acheter. Les limites aussi. Il faut une connexion à Internet. Tes questions et tes documents partent chez l'éditeur, qui fixe ses règles de conservation. Et tu dépends de ses prix, de ses quotas et de ses pannes.

## L'application ChatGPT ou Claude : une simple fenêtre

Beaucoup de gens pensent que l'application installée sur leur téléphone contient l'IA. Ce n'est pas le cas. L'application de **ChatGPT, Claude ou Gemini** ne pèse que quelques centaines de mégaoctets, alors qu'un grand modèle en pèse des centaines de gigaoctets. Elle sert d'écran, de clavier et de micro.

<div class="exemple">

**Un exemple concret**

Active le mode avion, puis ouvre l'application ChatGPT et pose une question. Rien ne se passe, ou un message d'erreur s'affiche. La preuve que le modèle ne se trouve pas dans ton téléphone : sans réseau, l'application ne peut pas joindre les serveurs d'OpenAI.

</div>

Ce fonctionnement explique aussi pourquoi l'application marche aussi bien sur un vieux téléphone que sur un récent. La puissance de ton appareil ne change presque rien à la qualité des réponses. Ce qui compte, c'est ton abonnement et la qualité de ta connexion.

Le même principe vaut pour les assistants sur ordinateur et les extensions de navigateur. Sauf mention contraire de l'éditeur, ils envoient tes demandes sur leurs serveurs. Garde ce réflexe avant d'y coller un document confidentiel.

## Sur ton ordinateur : l'IA en local

Faire tourner une IA **en local**, c'est télécharger un modèle ouvert et le faire calculer par ta propre machine. Les modèles de Mistral AI, Meta, Alibaba ou DeepSeek existent en petites tailles adaptées à ce cas. Des logiciels gratuits s'occupent de l'installation et proposent une fenêtre de discussion semblable à ChatGPT.

Ce qui compte le plus, c'est la **mémoire**. Un modèle de 7 à 8 milliards de paramètres, compressé, tient dans 5 à 6 gigaoctets. Un ordinateur portable récent avec 16 Go de mémoire le fait tourner correctement. Pour un modèle de 70 milliards, il faut une station de travail ou un Mac très bien équipé. La correspondance entre taille et matériel est détaillée dans [Paramètres d'une IA : que signifient 8B, 70B ou 1 000 milliards ?](/parametres-modele-ia/).

Les avantages sont précieux : tes textes ne quittent pas ta machine, l'usage est gratuit et marche hors connexion. En échange, les réponses sont moins bonnes que celles des grands modèles en ligne, surtout pour le raisonnement complexe.

## Sur ton téléphone : le rôle du NPU

Les smartphones récents embarquent une puce dédiée à l'IA : le **NPU**, pour « Neural Processing Unit ». Apple l'appelle Neural Engine, Qualcomm l'intègre à ses processeurs Snapdragon, Google à ses puces Tensor. Cette puce calcule les opérations d'un réseau de neurones en consommant peu de batterie.

Le NPU sert depuis des années à des tâches discrètes : améliorer tes photos, reconnaître ton visage, dicter un message ou traduire une phrase. Désormais, il fait aussi tourner de **petits modèles de langage**, de quelques milliards de paramètres. Google propose ainsi **Gemini Nano** sur certains téléphones Android, pour résumer un texte ou suggérer une réponse sans connexion.

Les ordinateurs suivent le même chemin. Depuis 2024, Microsoft réserve l'appellation **Copilot+ PC** aux machines dotées d'un NPU puissant. Ces puces sont bien moins puissantes qu'un centre de données. Elles réservent donc l'IA locale aux tâches courtes et simples, mais elles gardent les données sur l'appareil et répondent instantanément.

## Le fonctionnement hybride, le meilleur des deux mondes

De plus en plus d'appareils combinent les deux approches. On parle de **fonctionnement hybride**. Les demandes simples sont traitées sur l'appareil, rapidement et sans fuite de données. Les demandes trop lourdes partent vers un serveur.

Apple a poussé cette logique avec **Apple Intelligence**. Une partie des fonctions tourne sur l'iPhone. Pour les demandes plus complexes, le téléphone fait appel à **Private Cloud Compute**, des serveurs conçus par Apple. Selon l'entreprise, les données y sont traitées sans être conservées, et des chercheurs indépendants peuvent vérifier le logiciel.

Pour toi, l'hybride a un défaut : il est difficile de savoir où part chaque demande. Les réglages de confidentialité de ton appareil le précisent souvent. Prends l'habitude de les consulter, surtout si tu utilises ces fonctions pour des messages personnels ou professionnels.

## Le même prompt dans trois situations

Imagine la même demande : « Résume ce compte rendu de réunion de dix pages en cinq points. »

| Situation | Où se fait le calcul | Qualité | Confidentialité | Coût | Connexion |
|---|---|---|---|---|---|
| ChatGPT, Claude ou Gemini | Serveurs de l'éditeur | Excellente | Le document part chez l'éditeur | Gratuit avec limites, ou abonnement | Indispensable |
| Modèle ouvert sur ton ordinateur | Ta machine | Bonne pour un résumé | Rien ne sort de ton ordinateur | Gratuit, si le matériel suit | Inutile après l'installation |
| Fonction IA du téléphone | NPU du téléphone, parfois un serveur | Correcte pour un texte court | Bonne en local, à vérifier en hybride | Inclus dans l'appareil | Pas toujours nécessaire |

Pour un compte rendu sans données sensibles, le service en ligne donne le meilleur résultat. Pour un document confidentiel, le modèle local est le choix prudent. Pour un résumé rapide de quelques lignes, le téléphone suffit.

<div class="lexique">

**Les mots à connaître**

- **Cloud** : ensemble de serveurs distants auxquels on accède par Internet.
- **Centre de données** : bâtiment qui regroupe des milliers de serveurs et de puces de calcul.
- **En local** : le calcul se fait sur ton propre appareil, sans serveur extérieur.
- **NPU** : puce spécialisée dans les calculs d'IA, économe en énergie.
- **Fonctionnement hybride** : partage des demandes entre l'appareil et un serveur, selon leur difficulté.

</div>

## Questions fréquentes

### ChatGPT fonctionne-t-il sans Internet ?

Non. L'application ChatGPT envoie chaque question aux serveurs d'OpenAI. Sans connexion, elle ne peut rien répondre. Pour une IA hors ligne, il faut installer un modèle ouvert sur ton ordinateur.

### Qu'est-ce qu'un NPU dans un téléphone ?

C'est une puce spécialisée dans les calculs d'intelligence artificielle. Elle traite les photos, la reconnaissance vocale et de petits modèles de langage en consommant peu de batterie.

### Une IA en local est-elle plus sûre ?

Pour la confidentialité, oui : tes données ne quittent pas l'appareil. Mais télécharge les modèles et les logiciels uniquement depuis leurs sites officiels, pour éviter les programmes malveillants.

### Pourquoi les IA en ligne sont-elles plus puissantes ?

Parce que les centres de données disposent de centaines de gigaoctets de mémoire et de milliers de puces spécialisées. Aucun ordinateur personnel ne peut charger les plus grands modèles.

## La suite de la série

Pour savoir quels modèles tu peux installer chez toi, relis [qui fabrique les IA](/entreprises-ia-openai-anthropic-google-mistral/) : les modèles ouverts y sont détaillés. La suite pratique de la série montre comment installer une IA sur ton ordinateur avec Ollama ou LM Studio.
