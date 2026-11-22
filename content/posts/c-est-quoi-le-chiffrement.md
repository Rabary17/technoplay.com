---
title: "C'est quoi le chiffrement ?"
seoTitle: "Chiffrement : c'est quoi, en clair ?"
description: "Le chiffrement rend une information illisible pour qui n'a pas la clé. On t'explique le principe, avec des exemples de messagerie et de banque."
date: "2027-01-26"
author: "andrianina-rabarivelo"
category: "cybersecurite"
image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwzfHxzJUMzJUE5Y3VyaXQlQzMlQTklMjBpbmZvcm1hdGlxdWUlMjBjYWRlbmFzfGVufDB8MHx8fDE3OTUxNTk2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "a golden padlock sitting on top of a keyboard"
updated: "2026-11-22"
---

Tu entends le mot chiffrement dans les messageries, sur ton téléphone ou sur le site de ta banque. Derrière ce terme technique, il y a une idée simple : transformer une information pour qu'elle ne soit lisible que par la personne autorisée. Ce guide explique comment ça marche, où tu le croises déjà, et ce qu'il ne protège pas.

<div class="essentiel">

**L'essentiel en 30 secondes**

Le chiffrement transforme un message en texte illisible grâce à une clé. Seul le destinataire qui possède cette clé peut le relire. Il protège le transport et le stockage des données, mais pas ton compte si ton mot de passe fuite ou si ton téléphone est infecté.

</div>

## C'est quoi, concrètement ?

Imagine une boîte fermée à clé. Tu y mets une lettre, et seule la personne qui détient la clé peut l'ouvrir. Le chiffrement fonctionne sur ce principe, mais avec des calculs mathématiques qui rendent la lecture impossible sans la bonne clé.

Un texte normal s'appelle du **texte en clair**. Une fois chiffré, il devient une suite de caractères sans aucun sens, le **texte chiffré**. Pour revenir au texte original, il faut la **clé de déchiffrement**. Sans elle, même un ordinateur puissant mettrait un temps considérable à deviner le contenu.

<div class="exemple">

**Un exemple concret**

Une personne envoie un message privé à un proche depuis une application chiffrée. Le texte circule sous une forme illisible entre les deux téléphones. Seul l'appareil du destinataire, qui détient la clé correspondante, le retransforme en message clair à l'écran.

</div>

## Où tu croises le chiffrement au quotidien

Tu utilises du chiffrement bien plus souvent que tu ne le penses, souvent sans rien configurer.

- **Les messageries privées.** WhatsApp, Signal ou iMessage chiffrent le contenu des conversations de bout en bout.
- **Les sites web sécurisés.** Un cadenas près de l'adresse signale une connexion chiffrée entre ton navigateur et le site.
- **Le stockage du téléphone.** La plupart des smartphones récents chiffrent leurs données, pour qu'un vol n'expose pas tes photos et tes messages.
- **Les sauvegardes dans le cloud.** Certains services chiffrent les fichiers avant de les envoyer sur leurs serveurs.
- **Le paiement par carte.** Les échanges entre ton téléphone, le terminal et la banque passent par un canal chiffré.

## Chiffrement en transit, chiffrement au repos : la différence

Deux situations se présentent, et la protection n'est pas tout à fait la même.

Le **chiffrement en transit** protège une information pendant qu'elle voyage, entre ton téléphone et un serveur par exemple. C'est le cas d'un message envoyé sur une messagerie chiffrée, ou d'une page affichant le cadenas de sécurité.

Le **chiffrement au repos** protège une information stockée, sur ton téléphone, un disque dur ou un serveur distant. Il empêche quelqu'un qui met la main sur l'appareil ou le serveur de lire directement les fichiers.

Un service solide combine en général les deux. Une messagerie bien conçue chiffre le message pendant qu'il voyage, puis le garde chiffré une fois arrivé sur l'appareil.

## Ce que le chiffrement ne fait pas

<div class="attention">

**Le chiffrement ne rend pas ton compte invulnérable**

Si quelqu'un obtient ton mot de passe, installe un logiciel espion sur ton téléphone, ou te pousse à cliquer sur un faux lien, il peut lire ce que tu vois à l'écran. Le chiffrement, dans ce cas, n'y change rien. Il protège le transport et le stockage des données, pas ton comportement face aux arnaques.

</div>

Concrètement, le chiffrement ne t'empêche pas de te faire voler ton mot de passe par un faux message. Il ne bloque pas non plus un proche ou un collègue qui lit ton écran par-dessus ton épaule. Et il ne garantit rien si tu laisses ton téléphone déverrouillé.

## Comment vérifier que tu es protégé, pas à pas

1. **Vérifie l'adresse des sites sensibles.** Un cadenas et une adresse commençant par « https » signalent une connexion chiffrée vers ta banque ou ta boîte mail.
2. **Choisis une messagerie qui chiffre de bout en bout.** L'information figure en général dans les réglages de sécurité de l'application.
3. **Active le chiffrement du téléphone.** Sur la plupart des smartphones récents, il est activé par défaut dès que tu définis un code de verrouillage.
4. **Vérifie les sauvegardes.** Certaines options de sauvegarde chiffrée doivent être activées manuellement dans les réglages du compte.
5. **Protège l'accès avant tout.** Un bon mot de passe et la double authentification comptent autant que le chiffrement lui-même.

## Les erreurs à éviter

- **Croire qu'un message chiffré est totalement privé.** Le contenu est protégé, mais ton téléphone reste une porte d'entrée s'il est mal protégé.
- **Négliger le mot de passe du compte.** Un chiffrement parfait ne sert à rien si ton compte se pirate par un mot de passe trop simple.
- **Ignorer les sauvegardes non chiffrées.** Une copie de sauvegarde mal protégée peut exposer des messages que l'application chiffrait pourtant bien.
- **Confondre adresse sécurisée et site fiable.** Le cadenas protège la connexion, mais il ne garantit pas l'honnêteté du site visité.

## Les mots à connaître

<div class="lexique">

**Chiffrement** : transformation d'une information pour la rendre illisible sans la bonne clé.

**Clé de chiffrement** : information qui permet de rendre le message lisible à nouveau.

**Chiffrement de bout en bout** : protection qui ne laisse lire le message qu'à l'expéditeur et au destinataire, pas au service qui le transmet.

**Texte en clair** : texte original, lisible par tout le monde, avant chiffrement.

**Adresse sécurisée** : adresse de site qui utilise une connexion chiffrée, reconnaissable au cadenas et au « https ».

**Chiffrement en transit** : protection d'une donnée pendant qu'elle circule sur un réseau.

**Chiffrement au repos** : protection d'une donnée stockée sur un appareil ou un serveur.

</div>

## Questions fréquentes

### Un message chiffré est-il totalement privé ?

Il est protégé pendant le transport, mais ton téléphone reste une porte d'entrée. Protège-le par un code de verrouillage et des mises à jour régulières.

### Qu'est-ce que le chiffrement de bout en bout ?

C'est un chiffrement où seuls l'expéditeur et le destinataire disposent de la clé. Le service qui transmet le message ne peut pas le lire, même sur demande.

### Le chiffrement est-il réservé aux spécialistes ?

Non. Il est déjà intégré à la plupart des outils courants, souvent sans que tu aies rien à configurer toi-même.

### Le chiffrement ralentit-il mon téléphone ?

Sur un appareil récent, la différence est imperceptible. Les composants actuels sont conçus pour gérer ce calcul sans effort.

## Et maintenant ?

Pour protéger tes accès, lis [Comment choisir un bon mot de passe ?](/choisir-bon-mot-de-passe/) puis [Double authentification : comment l'activer ?](/double-authentification-activer/). Pour le réseau, lis [Le wifi public est-il dangereux ?](/wifi-public-dangereux/), et pour repérer les pièges les plus courants, [Comment reconnaître un faux message (phishing) ?](/reconnaitre-faux-message-phishing/). Pour une vue d'ensemble, découvre [C'est quoi la cybersécurité ?](/c-est-quoi-la-cybersecurite/).
