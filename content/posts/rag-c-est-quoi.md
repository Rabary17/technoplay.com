---
title: "C'est quoi un RAG, et à quoi ça sert ?"
seoTitle: "RAG en IA : c'est quoi, en clair ?"
description: "Le RAG permet à une IA de chercher dans tes documents avant de répondre. On t'explique le principe, les usages concrets et les limites."
date: "2026-11-01"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
---

***Un assistant IA répond mieux quand il peut consulter tes propres documents. C'est le principe du RAG, une technique très utilisée dans les outils professionnels.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- RAG signifie « génération augmentée par récupération ». L'IA cherche d'abord les passages utiles, puis elle répond.
- Cela permet de répondre avec des informations récentes ou privées, sans réentraîner le modèle.
- La réponse reste à vérifier : une mauvaise recherche produit une mauvaise réponse.

</div>

Un modèle de langage ne connaît que ce qu'il a appris pendant son entraînement. Il ignore donc le contenu de ton contrat de travail, le règlement de ton association ou la notice de ton four. Le RAG ajoute une étape de recherche avant la réponse, pour que l'IA s'appuie sur un texte précis.

## Comment ça marche, étape par étape

1. Les documents sont découpés en petits morceaux de texte.
2. Chaque morceau est transformé en suite de nombres qui représente son sens. On range ces morceaux dans un index, une sorte de fichier de recherche.
3. Quand tu poses une question, le système retrouve les morceaux les plus proches de ta demande.
4. Ces morceaux sont transmis à l'IA, qui rédige sa réponse à partir d'eux.

L'IA ne devine donc plus autant. Elle lit les passages pertinents avant de parler.

<div class="exemple">

**Un exemple concret**

Une association range son règlement intérieur dans un outil de questions-réponses. Un adhérent demande : « Quel est le délai pour annuler mon inscription ? » Le système retrouve l'article correspondant, et l'IA répond en citant ce passage. Si le règlement ne dit rien sur le sujet, une bonne installation doit répondre que l'information n'est pas trouvée, plutôt que d'inventer une règle.

</div>

## À quoi ça sert, dans la vraie vie ?

Le RAG est utilisé pour les bases de connaissances d'entreprise, pour les assistants de service client qui lisent la documentation d'un produit, ou pour interroger de grandes archives. Il peut aussi servir à toi, si tu as des documents personnels que tu veux interroger.

## Les limites à connaître

- **La qualité de la recherche compte beaucoup.** Si les bons passages ne sont pas retrouvés, la réponse sera fausse, même bien écrite.
- **La mise en page peut gêner.** Un tableau, une image ou un document scanné sont parfois mal lus.
- **Une réponse doit rester vérifiable.** Demande la source, puis ouvre le passage cité.

<div class="attention">

**Attention à tes données**

Avant d'envoyer des documents confidentiels à un service en ligne, vérifie où ils sont stockés et qui peut y accéder. Lis les conditions d'utilisation et les paramètres de confidentialité.

</div>

<div class="lexique">

**Les mots à connaître**

- **RAG** : technique qui ajoute une recherche dans des documents avant la réponse de l'IA.
- **Index** : organisation des documents qui permet de retrouver vite les passages utiles.
- **Source** : passage ou document sur lequel la réponse s'appuie.

</div>

## Questions fréquentes

### Le RAG remplace-t-il l'entraînement du modèle ?

Non. Le modèle reste le même. Le RAG lui fournit simplement des informations supplémentaires au moment de la question.

### Un RAG peut-il se tromper ?

Oui. Il peut retrouver un mauvais passage ou mal interpréter un texte. D'où l'intérêt de vérifier la source citée.

### Faut-il savoir programmer pour utiliser un RAG ?

Pas forcément. Certains outils proposent cette fonction sans code. Pour le construire soi-même, il faut des bases de programmation.

## Et maintenant ?

Pour automatiser des tâches avec l'IA, lis [C'est quoi un agent IA, au juste ?](/agent-ia/). Pour formuler des demandes claires, lis [Comment écrire un bon prompt pour ChatGPT ?](/prompt-chatgpt/).
