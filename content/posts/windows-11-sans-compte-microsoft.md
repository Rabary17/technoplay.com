---
title: "Windows 11 sans compte Microsoft : comment garder un compte local ?"
seoTitle: "Windows 11 sans compte Microsoft : la méthode officielle"
description: "Windows 11 sans compte Microsoft : ce qu'apporte un compte local, comment y passer avec la méthode officielle et quels pièges éviter."
date: "2026-10-15"
author: "nekena-judicael"
category: "appareils-internet"
updated: "2026-10-15"
sources:
  - titre: "Microsoft Support : passer d'un compte local à un compte Microsoft dans Windows"
    url: "https://support.microsoft.com/fr-fr/windows/passer-d-un-compte-local-%C3%A0-un-compte-microsoft-dans-windows-395203bf-9f1b-eb24-b042-5b8dae6c1d20"
  - titre: "Microsoft Q&A : l'option « Se connecter avec un compte local » n'apparaît plus"
    url: "https://learn.microsoft.com/fr-fr/answers/questions/2006716/loption-se-connecter-avec-un-compte-local-nappara"
sourcesConsultees: "2026-10-15"
---

***Windows 11 pousse fort à créer un compte Microsoft. Tu peux pourtant garder un compte local, c'est-à-dire un compte qui vit uniquement sur ton ordinateur. Voici la différence et la méthode officielle pour y passer.***

<div class="essentiel">

**L'essentiel, si tu es pressé**

- Un compte local reste sur ton PC. Un compte Microsoft relie ton PC à un identifiant en ligne.
- Si tu as déjà un compte Microsoft, tu peux passer à un compte local dans les Paramètres, en quelques clics.
- Note le mot de passe et crée un disque de réinitialisation : sans lui, un mot de passe oublié est perdu.

</div>

Tu viens d'acheter un PC avec Windows 11, ou tu veux réinstaller Windows. À un moment, l'installation te demande de te connecter avec un compte Microsoft. Tu hésites, car tu ne veux pas lier ton ordinateur à un compte en ligne. C'est une question légitime, et elle a une réponse claire.

Cet article explique la différence entre les deux types de comptes et la méthode officielle de Microsoft. Il ne décrit pas les astuces qui contournent l'étape d'installation. Elles changent souvent, et nous ne les avons pas vérifiées sur une version à jour.

## C'est quoi, concrètement ?

Un compte Microsoft est un identifiant en ligne. Il sert à te connecter à Windows et à plusieurs services de Microsoft. Un compte local est un identifiant qui n'existe que sur cet ordinateur. Tu choisis un nom d'utilisateur et un mot de passe, et Windows les garde en local.

<div class="exemple">

**Un exemple concret**

Dans une famille, l'ordinateur commun a un compte local par personne. Chacun ouvre sa session avec son propre mot de passe. Personne n'a besoin de partager un identifiant en ligne, et le PC démarre sans demander de connexion à un service externe.

</div>

## Compte Microsoft ou compte local : ce qui change

| Point | Compte Microsoft | Compte local |
|---|---|---|
| Identifiant | En ligne, relié à ton compte Microsoft | Propre à cet ordinateur |
| Recommandation de Microsoft | Microsoft recommande ce type de compte pour se connecter à Windows | Possible, mais non recommandé par Microsoft |
| Mot de passe oublié | Récupérable par les procédures en ligne de Microsoft | Irrécupérable sans disque de réinitialisation |
| Plusieurs appareils | Relié à ton compte sur tous tes appareils | Séparé d'un PC à l'autre |

Le choix dépend de ton usage. Si tu as plusieurs appareils et que tu veux retrouver tes réglages partout, le compte Microsoft est pratique. Si tu veux un PC indépendant, le compte local convient.

## Passer d'un compte Microsoft à un compte local, pas à pas

Microsoft décrit la procédure dans sa page d'aide. Elle se fait depuis les Paramètres, sans réinstaller Windows.

1. Ouvre les **Paramètres**, puis clique sur **Comptes**, puis sur **Vos informations**.
2. Clique sur **Se connecter avec un compte local**. Ce lien n'apparaît que si tu utilises un compte Microsoft.
3. Saisis un **nom d'utilisateur**. Il doit être différent de tous les autres noms présents sur l'appareil.
4. Saisis un **mot de passe**, puis une **indication de mot de passe**.
5. Clique sur **Suivant**, puis sur **Déconnectez-vous et terminez**.
6. Reconnecte-toi avec le compte local.

Avant de terminer, crée un disque de réinitialisation du mot de passe. Microsoft le recommande pour le compte local : sans lui, un mot de passe oublié ne peut pas être récupéré.

<div class="attention">

**Attention au mot de passe**

Un compte local n'a pas de procédure de récupération en ligne. Note ton mot de passe dans un endroit sûr, et crée le disque de réinitialisation avant de quitter les réglages. Ne garde jamais le mot de passe dans un simple fichier non protégé.

</div>

## Pourquoi l'option « compte local » n'apparaît pas ?

Certains utilisateurs ne voient pas le lien **Se connecter avec un compte local**. Une question de la communauté Microsoft, posée en août 2024, décrit ce cas sous Windows 11 23H2. Aucune réponse officielle n'y explique la cause.

Une réponse proposée par un personnel externe à Microsoft suggère deux étapes. D'abord, vérifier les comptes avec la commande `netplwiz`. Ensuite, réparer les fichiers système avec `sfc /scannow`, puis `DISM /Online /Cleanup-Image /RestoreHealth`, dans un terminal lancé en administrateur. Il s'agit d'une piste de communauté, pas d'une procédure officielle. Ne lance ces commandes qu'en étant à l'aise avec elles, et sauvegarde tes données avant.

## Les méthodes qui évitent le compte à l'installation

Des guides en ligne décrivent des méthodes pour éviter le compte Microsoft pendant l'installation de Windows 11. Nous ne les avons pas vérifiées : la page officielle consultée n'en parle pas. La méthode la plus sûre reste celle de la section précédente.

## Les erreurs de débutant à éviter

- **Supprimer le compte Microsoft avant d'avoir un compte administrateur.** Vérifie que ton compte local a les droits d'administrateur, pour garder la main sur ton PC.
- **Oublier le disque de réinitialisation.** Sans lui, un mot de passe perdu bloque l'accès au PC.
- **Croire que le compte local protège mieux.** La sécurité dépend surtout du mot de passe et des mises à jour, pas du type de compte.
- **Appliquer une astuce trouvée au hasard.** Une commande copiée depuis un forum peut casser une installation.

<div class="lexique">

**Les mots à connaître**

- **Compte local** : un compte qui n'existe que sur cet ordinateur.
- **Compte administrateur** : un compte qui peut installer des logiciels et modifier les réglages du système.
- **Disque de réinitialisation** : un fichier créé sur une clé USB qui permet de changer un mot de passe oublié.
- **Synchronisation** : la copie automatique de tes réglages ou de tes fichiers entre plusieurs appareils.
- **Terminal administrateur** : une fenêtre de commandes qui peut modifier le système. Elle se lance avec des droits étendus.
- **Fichiers système** : les fichiers qui font fonctionner Windows. Les outils `sfc` et `DISM` les vérifient et les réparent.

</div>

## Questions fréquentes

**Peut-on installer Windows 11 sans compte Microsoft ?**
Les pages officielles de Microsoft recommandent le compte Microsoft. Des méthodes existent pour l'éviter à l'installation, mais elles changent souvent. Vérifie leur état sur une installation à jour avant de t'y fier.

**Comment passer d'un compte Microsoft à un compte local ?**
Ouvre Paramètres, puis Comptes, puis Vos informations. Clique sur « Se connecter avec un compte local », puis suis les étapes. Crée un disque de réinitialisation.

**Pourquoi l'option « compte local » n'apparaît pas ?**
Une question de la communauté Microsoft décrit ce cas, sans cause officielle. Une piste proposée consiste à vérifier les comptes avec netplwiz, puis à réparer les fichiers système.

**Un compte local est-il plus sécurisé ?**
Pas forcément. Un mot de passe fort, des mises à jour régulières et un antivirus à jour comptent davantage que le type de compte.

## Et maintenant ?

Tu sais maintenant comment garder un compte local, et comment passer de l'un à l'autre. Pour d'autres réglages simples de ton ordinateur, consulte [le thème Appareils & Internet](/appareils-internet/).
