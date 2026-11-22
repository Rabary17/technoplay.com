---
title: "Python : écrire son premier programme"
seoTitle: "Python : écrire son premier programme"
description: "Python est un langage lisible, idéal pour débuter. On t'explique comment écrire et lancer ton premier programme, pas à pas."
date: "2026-12-29"
author: "andee-rakotovao"
category: "programmation"
image: "https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHw0fHxkJUMzJUE5dmVsb3BwZXVyJTIwY2xhdmllcnxlbnwwfDB8fHwxNzk1MTU5NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "white computer keyboard"
updated: "2026-11-22"
sources:
  - titre: "Python : premiers pas (python.org)"
    url: "https://www.python.org/about/gettingstarted/"
  - titre: "Python : tutoriel officiel (documentation Python)"
    url: "https://docs.python.org/3/tutorial/"
sourcesConsultees: "2026-11-22"
---

***Python est souvent conseillé pour commencer à programmer, car il se lit presque comme une phrase. Ton premier programme peut tenir en une ligne, et suffit à comprendre l'essentiel.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- Python est un langage clair, très utilisé pour apprendre, automatiser des tâches et analyser des données.
- Un programme est une suite d'instructions qui s'exécute de haut en bas.
- Ton premier programme affiche un message, puis demande une saisie à la personne qui l'utilise.

</div>

Pour écrire du Python, il faut un éditeur de texte et l'**interpréteur** du langage, qui exécute tes instructions une par une. Beaucoup d'environnements en ligne permettent de tester sans rien installer. C'est une bonne façon de commencer, avant d'installer quoi que ce soit sur ton ordinateur.

## C'est quoi, concrètement ?

Un programme Python est un fichier texte, avec l'extension `.py`, qui contient des instructions lues de haut en bas par l'interpréteur. Chaque ligne déclenche une action : afficher un texte, calculer un résultat, demander une information. Pas besoin de compiler quoi que ce soit avant de lancer le fichier, ce qui rend les premiers essais très rapides.

<div class="exemple">

**Un exemple concret**

Le programme demande le prénom, puis répond « Bonjour, Léa ! ». Si tu ajoutes une condition, il peut aussi dire « Bonne journée » si le prénom est court, ou « Enchanté » sinon. Tu combines déjà saisie, variable et condition dans un programme de quelques lignes.

</div>

## Comment faire, pas à pas

1. **Ouvre un environnement Python.** Un site en ligne suffit pour commencer, sans rien installer. Tu peux installer Python plus tard, depuis le site officiel.
2. **Écris ta première instruction** : `print("Bonjour, je code !")`. Lance le programme : le message s'affiche à l'écran.
3. **Ajoute une saisie** avec `input()`, pour que le programme te demande une information.
4. **Stocke la réponse dans une variable**, une case qui garde l'information le temps du programme.
5. **Ajoute une condition** avec `if` et `else`, pour que le programme réagisse différemment selon la réponse.
6. **Relance le programme plusieurs fois**, en changeant la saisie, pour voir comment il réagit.

| Notion | Ce qu'elle fait | Exemple |
|---|---|---|
| Instruction | Une action exécutée par l'interpréteur | `print("Bonjour")` |
| Variable | Une case qui garde une information | `prenom = "Léa"` |
| Saisie | Information tapée par l'utilisateur | `input("Ton prénom ? ")` |
| Condition | Choix selon une situation | `if len(prenom) < 4:` |
| Boucle | Répétition d'une action | `for i in range(5):` |

<div class="attention">

**Fais attention à l'indentation**

En Python, les espaces au début d'une ligne comptent : ils indiquent quelles instructions appartiennent à un même bloc. Un décalage mal placé provoque une erreur. Lis le message d'erreur affiché, il indique presque toujours la ligne concernée.

</div>

## Les erreurs à éviter

- **Mélanger espaces et tabulations** pour l'indentation : Python peut refuser d'exécuter le programme.
- **Oublier les deux-points** à la fin d'une ligne `if`, `for` ou `while`.
- **Copier un code trouvé en ligne** sans en comprendre chaque ligne, ce qui bloque dès qu'il faut l'adapter à un cas différent.
- **Vouloir tout apprendre d'un coup** : un petit programme terminé vaut mieux que dix notions à moitié comprises.

## Les mots à connaître

<div class="lexique">

- **Interpréteur** : logiciel qui lit et exécute le code Python ligne par ligne.
- **Saisie** : information tapée par l'utilisateur pendant l'exécution du programme.
- **Indentation** : décalage des lignes qui indique l'appartenance à un bloc d'instructions.
- **Variable** : case nommée qui garde une valeur pour la durée du programme.

</div>

## Questions fréquentes

### Python est-il difficile à apprendre ?

Il est souvent considéré comme l'un des langages les plus accessibles pour débuter, grâce à sa syntaxe lisible et proche du langage courant.

### Faut-il installer Python sur son ordinateur ?

Ce n'est pas obligatoire pour commencer. Tu peux utiliser un environnement en ligne, puis installer Python depuis le site officiel du langage quand tu veux aller plus loin.

### Peut-on faire des projets concrets avec Python ?

Oui : petits outils, automatisation de tâches répétitives ou analyse de données. Ton niveau détermine l'ambition du projet, pas le langage lui-même.

### Combien de temps pour écrire son premier programme ?

Un script qui affiche un message ou traite une petite saisie prend souvent moins d'une heure, installation ou ouverture de l'environnement en ligne comprise.

## Et maintenant ?

Pour replacer ce langage parmi les autres, lis [Quel langage de programmation apprendre en premier ?](/quel-langage-apprendre-en-premier/). Pour l'idée de programme en général, lis [C'est quoi la programmation, concrètement ?](/c-est-quoi-la-programmation/). Pour garder une trace de chaque version de ton code, découvre [Git, c'est quoi ?](/git-c-est-quoi/) Pour continuer à progresser gratuitement, consulte les [ressources pour apprendre à coder gratuitement](/apprendre-coder-gratuitement/).
