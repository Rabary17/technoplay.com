---
title: "Git, c'est quoi ?"
seoTitle: "Git : c'est quoi et à quoi ça sert ?"
description: "Git garde l'historique de tes fichiers et te permet de revenir en arrière. On t'explique l'idée simplement, avant les commandes."
date: "2026-12-31"
author: "andee-rakotovao"
category: "programmation"
image: "https://images.unsplash.com/photo-1574012716378-0ca6f4c18c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwxfHxkJUMzJUE5dmVsb3BwZXVyJTIwY2xhdmllcnxlbnwwfDB8fHwxNzk1MTU5NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "black computer keyboard"
updated: "2026-11-22"
---

<div class="essentiel">

**L'essentiel en 30 secondes**

Git est un logiciel qui garde l'historique des modifications d'un projet, étape par étape, sous forme d'enregistrements appelés commits. Il permet de revenir à une version antérieure et de travailler à plusieurs sans écraser le travail des autres.

</div>

Tu modifies ton projet, ça casse, et tu ne sais plus ce qui a changé. Git est l'outil qui garde la trace de chaque modification, pour revenir en arrière quand c'est nécessaire. Il s'est imposé comme le standard du secteur, bien au-delà des seuls développeurs.

## C'est quoi, concrètement ?

Git est un **système de gestion de versions**. Il ne sauvegarde pas seulement ton projet à un instant donné. Il garde la mémoire de chacun de ses changements, avec une date, un auteur et une description. Tu peux comparer deux versions, revenir à un état précédent, ou comprendre qui a modifié quoi et pourquoi.

<div class="exemple">

**Un exemple concret**

Un étudiant écrit son rapport. Avant de réorganiser complètement le plan, il fait un commit. Si la nouvelle version est moins bonne, il revient en arrière en quelques secondes, sans avoir à se souvenir manuellement de l'ancien contenu. Le même principe s'applique à un site web, à un programme ou à n'importe quel ensemble de fichiers texte.

</div>

Trois notions suffisent pour comprendre l'essentiel. Un **dépôt** est le dossier de projet suivi par Git. Un **commit** est un instantané du projet à un moment donné, accompagné d'un message qui le décrit. Une **branche** est une piste de travail séparée, utile pour tester une idée sans toucher à la version principale ; tu peux ensuite la fusionner si l'essai est concluant.

## Comment faire, pas à pas

1. **Installe Git** sur ton ordinateur, depuis le site officiel git-scm.com, disponible pour Windows, macOS et Linux.
2. **Configure ton identité**, avec ton nom et ton adresse e-mail, pour que chaque commit t'identifie correctement.
3. **Initialise un dépôt** dans le dossier de ton projet, ou récupère un dépôt existant en ligne.
4. **Modifie tes fichiers**, comme d'habitude, dans ton éditeur de code.
5. **Ajoute les fichiers modifiés** à la prochaine sauvegarde, puis crée un commit avec un message clair qui résume le changement.
6. **Répète** ce cycle à chaque étape significative de ton travail, plutôt qu'une seule fois en fin de journée.

## Lequel choisir selon ton cas ?

- **Tu débutes et tu veux comprendre la logique** : commence par une interface graphique intégrée à [ton éditeur de code](/vs-code-debutant/), qui affiche les changements visuellement avant de passer aux commandes.
- **Tu veux aller plus vite une fois à l'aise** : les commandes en ligne de texte restent la méthode la plus rapide et la plus universelle, utilisable sur n'importe quelle machine.
- **Tu travailles seul sur un projet personnel** : un dépôt local suffit, sans besoin immédiat d'un service en ligne.
- **Tu travailles à plusieurs** : héberge ton dépôt sur un service comme GitHub ou GitLab, pour partager le travail et suivre les contributions de chacun.

<div class="attention">

**Ne mets jamais de secrets dans un dépôt**

Un mot de passe ou une clé d'accès enregistrés dans l'historique Git restent visibles, même après leur suppression apparente du fichier. Si cela arrive, change immédiatement le secret concerné plutôt que de compter sur une simple suppression.

</div>

## Les erreurs à éviter

**Écrire des messages de commit vagues.** Un message comme « modifications » n'aide personne plus tard, toi y compris. Décris ce qui a changé et pourquoi.

**Faire un seul commit gigantesque.** Des commits petits et fréquents sont plus faciles à comprendre, et plus simples à annuler si besoin.

**Travailler directement sur la branche principale à plusieurs.** Une branche séparée pour chaque fonctionnalité évite d'écraser le travail des autres.

**Ignorer les fichiers à ne pas suivre.** Un fichier de configuration personnel ou un gros fichier temporaire n'a souvent rien à faire dans l'historique du projet.

## Les mots à connaître

<div class="lexique">

- **Dépôt** : dossier de projet suivi par Git, qui contient tout l'historique des modifications.
- **Commit** : enregistrement d'une étape du projet, accompagné de son message descriptif.
- **Branche** : piste de travail séparée, utilisée pour tester une idée sans toucher à la version principale.
- **Fusion (merge)** : opération qui réunit les changements d'une branche avec une autre.

</div>

## Questions fréquentes

### Faut-il utiliser des commandes ?

Git fonctionne surtout par commandes, mais des interfaces graphiques existent, souvent intégrées à un éditeur de code. Commence par quelques commandes de base pour bien comprendre la logique avant de choisir un outil visuel.

### Git est-il réservé aux développeurs ?

Non. Il sert aussi aux rédacteurs, aux chercheurs ou à toute personne qui modifie un document à plusieurs versions et veut garder une trace fiable des changements.

### Git et GitHub, c'est la même chose ?

Non. Git est l'outil qui gère l'historique sur ta machine. GitHub est un service en ligne qui héberge des dépôts Git et facilite le travail à plusieurs.

### Combien de temps faut-il pour apprendre les bases de Git ?

Quelques heures suffisent pour les commandes essentielles : créer un dépôt, faire un commit, consulter l'historique. La maîtrise des branches et des fusions vient avec la pratique régulière.

## Et maintenant ?

- [C'est quoi un algorithme ?](/c-est-quoi-un-algorithme/)
- [C'est quoi la programmation, concrètement ?](/c-est-quoi-la-programmation/)
- [Quel éditeur de code pour débuter ?](/vs-code-debutant/)
- [Pourquoi faire des tests automatisés ?](/tests-automatises-pourquoi/)
- [Apprendre à coder gratuitement](/apprendre-coder-gratuitement/)
