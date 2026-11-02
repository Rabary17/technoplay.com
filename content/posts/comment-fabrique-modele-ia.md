---
title: "Comment on fabrique un modèle d'IA, de la collecte des données à sa sortie"
seoTitle: "Comment fabrique-t-on un modèle d'IA ? Les 7 étapes"
description: "Collecte, nettoyage, pré-entraînement, fine-tuning, alignement, tests, compression : les 7 étapes pour fabriquer un modèle d'IA de A à Z."
date: "2026-11-02"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
sources:
  - titre: "Meta : The Llama 3 Herd of Models (2024)"
    url: "https://arxiv.org/abs/2407.21783"
  - titre: "DeepSeek-AI : DeepSeek-V3 Technical Report (2024)"
    url: "https://arxiv.org/abs/2412.19437"
  - titre: "Epoch AI : How much does it cost to train frontier AI models?"
    url: "https://epoch.ai/blog/how-much-does-it-cost-to-train-frontier-ai-models"
  - titre: "Ouyang et al., « Training language models to follow instructions with human feedback » (OpenAI, 2022)"
    url: "https://arxiv.org/abs/2203.02155"
  - titre: "OpenAI : GPT-4 Technical Report (2023)"
    url: "https://arxiv.org/abs/2303.08774"
sourcesConsultees: "2026-11-02"
---

***Fabriquer un modèle d'IA demande des mois de travail, des milliers de puces et des centaines de spécialistes. Le chantier suit sept étapes, de la collecte des textes jusqu'au fichier livré aux utilisateurs.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- Avant l'entraînement : on collecte des milliers de milliards de mots, puis on les nettoie.
- Pendant : le pré-entraînement apprend au modèle à prédire le token suivant, sur des milliers de GPU, pendant des semaines.
- Après : fine-tuning, alignement, tests de sécurité et compression transforment ce modèle brut en assistant utilisable.

</div>

Derrière une réponse de ChatGPT ou de Claude se cache un chantier industriel. Meta a mobilisé plus de 16 000 cartes graphiques pour entraîner son plus gros modèle Llama 3. Les estimations pour les modèles les plus avancés se chiffrent en centaines de millions de dollars. La fabrication suit toujours le même fil, en sept étapes.

## Étapes 1 et 2 : collecter puis nettoyer les données

Tout commence par la **collecte**. Un grand modèle de langage lit des milliers de milliards de mots avant de savoir écrire. Les équipes rassemblent des pages web, souvent issues d'archives publiques comme Common Crawl. Elles y ajoutent des livres, des articles scientifiques, du code informatique et des textes dans des dizaines de langues. Certains éditeurs achètent aussi des contenus sous licence, auprès de groupes de presse ou de plateformes.

Ces données brutes sont pleines de déchets. Le **nettoyage** occupe donc une large part du travail. On retire les doublons, les pages de publicité, les textes mal encodés et les contenus illégaux ou toxiques. On filtre aussi les données personnelles, comme les numéros de téléphone ou les adresses.

Des programmes notent ensuite la qualité de chaque document et gardent les meilleurs. Le rapport de Meta sur Llama 3 détaille ces filtres sur plusieurs pages. La leçon est connue des chercheurs : **des données propres valent mieux que des données abondantes**. Un modèle entraîné sur des textes médiocres écrit des textes médiocres.

## Étape 3 : le pré-entraînement, le cœur du chantier

Le **pré-entraînement** est l'étape la plus longue et la plus chère. Le réseau de neurones lit les données nettoyées et s'exerce sur une seule tâche : deviner le token suivant d'un texte. Le token, ce morceau de mot que manipule l'IA, fait l'objet de notre article [C'est quoi un token ?](/token-ia-c-est-quoi/).

À chaque erreur, un algorithme ajuste légèrement les milliards de paramètres du réseau. L'opération se répète des milliards de fois. Peu à peu, le modèle apprend la grammaire, les faits, les styles d'écriture et même des formes de raisonnement.

Le calcul est réparti sur des milliers de GPU reliés entre eux. Meta indique avoir utilisé jusqu'à 16 384 cartes H100 pour Llama 3. Une panne de puce, fréquente à cette échelle, oblige à reprendre depuis une sauvegarde. À la fin, on obtient un **modèle de base**. Il complète des textes très bien, mais il ne sait pas encore tenir une conversation ni suivre une consigne.

## Étapes 4 et 5 : fine-tuning et alignement

Le modèle de base ressemble à un érudit sans savoir-vivre. Il complète les textes, mais ne répond pas aux demandes.

<div class="exemple">

**Un exemple concret**

Tu écris à un modèle de base : « Donne-moi une recette de crêpes. » Il peut continuer par « Donne-moi une recette de gaufres. Donne-moi une recette de pancakes. » Il imite une liste de questions trouvée sur le web, au lieu d'y répondre. Après le fine-tuning, le même modèle t'écrit la recette.

</div>

Le **fine-tuning**, ou ajustement, corrige ce comportement.

Des équipes rédigent des dizaines de milliers d'exemples de bonnes conversations : une question, puis la réponse idéale. Le modèle s'entraîne sur ces exemples, beaucoup moins nombreux que les données du pré-entraînement. Il apprend le format d'un dialogue, le ton attendu et la façon de suivre une instruction.

Vient ensuite l'**alignement**. Le but : rendre les réponses utiles, honnêtes et sans danger. La méthode la plus connue, le **RLHF**, a été popularisée par OpenAI en 2022. Des évaluateurs humains comparent deux réponses du modèle et indiquent la meilleure. Le modèle apprend de ces préférences. D'autres éditeurs, comme Anthropic, s'appuient aussi sur une liste de principes écrits que le modèle applique à ses propres réponses.

## Étape 6 : les tests et le red teaming

Avant toute sortie, le modèle passe une batterie d'**évaluations**. On mesure ses performances sur des milliers d'exercices : mathématiques, code, compréhension de texte, connaissances générales. Ces tests standardisés, appelés benchmarks, permettent de le comparer aux versions précédentes et aux concurrents.

On teste aussi ses défauts. Le **red teaming** consiste à confier le modèle à des équipes chargées de le pousser à mal se comporter. Elles essaient de lui faire écrire des instructions dangereuses, de contourner ses règles ou de lui soutirer des données. Pour GPT-4, OpenAI a fait appel à plus de cinquante experts extérieurs, en cybersécurité, chimie ou désinformation.

Chaque faille trouvée renvoie le modèle vers une nouvelle série d'ajustements. Les éditeurs publient ensuite une **fiche technique**, souvent appelée « system card ». Elle décrit les tests menés, les risques repérés et les protections mises en place. Ces fiches sont la meilleure source pour comprendre les limites d'un modèle.

## Étape 7 : compression et livraison

Un modèle tout juste entraîné est énorme et lent. La dernière étape consiste à l'alléger pour qu'il réponde vite et coûte moins cher à faire tourner. Plusieurs techniques existent.

La **quantification** stocke chaque paramètre avec moins de précision, par exemple sur 8 ou 4 bits au lieu de 16. Le fichier pèse deux à quatre fois moins lourd, pour une perte de qualité souvent faible. La **distillation** entraîne un petit modèle à imiter les réponses d'un grand. C'est ainsi que naissent les versions « mini » ou « légères » des grands assistants.

Le modèle livré n'est au fond qu'un **fichier de paramètres**, accompagné d'un programme pour l'exécuter. Les éditeurs le déploient sur leurs serveurs et l'ouvrent au public par une application ou une API. Certains, comme Meta ou Mistral AI, publient aussi ce fichier pour que chacun puisse l'installer sur sa propre machine.

## Combien de temps et d'argent faut-il ?

Le pré-entraînement d'un grand modèle dure de quelques semaines à plusieurs mois. Meta décrit 54 jours de pré-entraînement principal pour Llama 3. En comptant la préparation des données, les ajustements et les tests, un projet complet s'étale souvent sur un an.

Le coût varie énormément. L'institut de recherche Epoch AI a fait le calcul pour les modèles les plus avancés. Leur coût d'entraînement a été multiplié par 2,4 environ chaque année depuis 2016. Il prévoit des entraînements à plus d'un milliard de dollars d'ici 2027. Le matériel représente la plus grosse part, devant les salaires des équipes. L'électricité pèse peu dans la facture, mais beaucoup sur les réseaux électriques.

À l'inverse, la start-up chinoise DeepSeek a surpris fin 2024. Elle a annoncé environ 5,6 millions de dollars de calcul pour la dernière phase d'entraînement de son modèle V3. Ce chiffre ne compte ni les essais préalables, ni les salaires, ni l'achat des puces. Il montre quand même que des méthodes plus efficaces réduisent fortement la facture.

## Les 7 étapes en un coup d'œil

| Étape | Ce qu'on fait | Durée indicative |
|---|---|---|
| 1. Collecte | Rassembler textes, livres, code et contenus sous licence | Plusieurs mois |
| 2. Nettoyage | Retirer doublons, déchets et données personnelles | Plusieurs mois, en parallèle |
| 3. Pré-entraînement | Apprendre à prédire le token suivant | Semaines à mois, sur des milliers de GPU |
| 4. Fine-tuning | Apprendre à dialoguer et à suivre des consignes | Quelques jours à semaines |
| 5. Alignement | Rendre les réponses utiles, honnêtes et sûres | Quelques semaines |
| 6. Tests et red teaming | Mesurer les performances, chercher les failles | Plusieurs semaines |
| 7. Compression et livraison | Alléger le modèle et le déployer | Quelques semaines |

<div class="lexique">

**Les mots à connaître**

- **Pré-entraînement** : phase où le modèle apprend sur d'énormes quantités de textes à prédire le token suivant.
- **Modèle de base** : modèle sorti du pré-entraînement, qui complète des textes sans savoir dialoguer.
- **Fine-tuning** : ajustement d'un modèle sur des exemples choisis pour lui apprendre une tâche précise.
- **RLHF** : apprentissage à partir des préférences d'évaluateurs humains entre deux réponses.
- **Red teaming** : tests où des experts cherchent à faire mal se comporter le modèle.
- **Quantification** : réduction de la précision des paramètres pour alléger un modèle.

</div>

## Questions fréquentes

### Combien de temps faut-il pour entraîner une IA comme ChatGPT ?

Le pré-entraînement dure de quelques semaines à quelques mois. Avec la collecte des données, les ajustements et les tests, un nouveau grand modèle demande en général près d'un an de travail.

### Combien coûte l'entraînement d'un modèle d'IA ?

De quelques milliers d'euros pour un petit modèle spécialisé à plusieurs centaines de millions de dollars pour les plus grands. Le matériel, surtout les GPU, représente la plus grosse dépense.

### Peut-on entraîner sa propre IA chez soi ?

Pas un grand modèle. En revanche, tu peux ajuster un petit modèle ouvert sur tes propres exemples avec une bonne carte graphique. C'est du fine-tuning, pas un pré-entraînement complet.

### D'où viennent les données d'entraînement des IA ?

Surtout du web public, de livres, d'articles scientifiques et de code. Certains éditeurs achètent des contenus sous licence. L'origine exacte de ces données fait l'objet de procès pour droits d'auteur dans plusieurs pays.

### Un modèle d'IA continue-t-il d'apprendre après sa sortie ?

Non. Ses paramètres sont figés à la livraison. Pour intégrer de nouvelles connaissances, l'éditeur doit entraîner et publier une nouvelle version.

## La suite de la série

Tu connais maintenant la chaîne de fabrication. L'article précédent explique [ce qu'est un token](/token-ia-c-est-quoi/), l'unité que le modèle apprend à prédire. Le suivant décode les fameux chiffres 8B ou 70B : que signifient les paramètres d'une IA ?
