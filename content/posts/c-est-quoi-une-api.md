---
title: "C'est quoi une API ?"
seoTitle: "API : c'est quoi, en clair ?"
description: "Une API permet à deux logiciels de se parler selon des règles précises. On t'explique l'idée avec des images simples, sans termes compliqués."
date: "2027-01-04"
author: "andee-rakotovao"
category: "programmation"
image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTE4NzJ8MHwxfHNlYXJjaHwzfHxjb2RlJTIwb3JkaW5hdGV1ciUyMCVDMyVBOWNyYW58ZW58MHwwfHx8MTc5NTE1OTY5MXww&ixlib=rb-4.1.0&q=80&w=1080"
imageAlt: "lines of HTML codes"
updated: "2026-11-22"
---

Quand une application affiche la météo, un itinéraire ou le solde d'un compte, elle va souvent chercher l'information ailleurs, auprès d'un autre service. L'**API** est le passage qui organise cet échange entre deux logiciels. Ce guide explique l'idée simplement, avec des images du quotidien, avant tout terme technique.

<div class="essentiel">

**L'essentiel en 30 secondes**

Une API (interface de programmation) est un ensemble de règles qui permet à deux logiciels d'échanger des informations. Une application envoie une demande, l'API la transmet au bon endroit et rapporte la réponse, dans un format défini à l'avance.

</div>

## C'est quoi une API, concrètement ?

Imagine un serveur de restaurant. Tu ne vas pas en cuisine préparer ton plat toi-même, tu passes ta commande à travers lui. L'API joue ce rôle entre deux programmes. Elle reçoit la demande, la transmet au bon service, puis rapporte la réponse, sans que tu aies besoin de savoir ce qui se passe en coulisses.

Le mot API signifie **interface de programmation d'application**. Une interface, c'est un point de passage défini, qui précise ce qu'on peut demander et sous quelle forme. Un logiciel qui propose une API accepte des demandes précises, écrites selon des règles fixées d'avance. Il renvoie une réponse dans un format attendu, souvent du texte structuré appelé **JSON**.

<div class="exemple">

**Un exemple concret**

Une application de sport affiche la météo du jour. Elle envoie une demande à l'API d'un service météo, en indiquant le nom de la ville. Le service répond avec les températures prévues et le risque de pluie. L'application affiche ces données dans son écran, sans savoir comment elles ont été mesurées ni calculées.

</div>

## Pourquoi les API sont si utiles

Une API évite à chaque logiciel de réinventer la roue. Une application de cartes peut utiliser les données d'un fournisseur spécialisé, sans les recréer elle-même. Un site de voyage peut afficher des prix d'hôtels venus de plusieurs partenaires, sans gérer les chambres lui-même. Chacun se concentre sur son métier, et laisse l'API faire le lien.

Cette logique explique pourquoi tant de services se combinent aujourd'hui. Une application de livraison peut utiliser une API de cartes pour le trajet, une API de paiement pour la facture, et une API de messages pour prévenir le client. Trois services différents, un seul écran pour toi.

## Comment se déroule un échange, pas à pas

1. Une application prépare une **requête** : une demande précise, avec les informations nécessaires, comme une ville ou un identifiant.
2. Elle envoie cette requête à l'adresse de l'API, souvent accompagnée d'une **clé d'API** qui prouve qu'elle est autorisée.
3. L'API vérifie la demande, va chercher l'information ou effectue l'action demandée.
4. L'API renvoie une réponse, dans un format défini à l'avance, que l'application sait lire.
5. L'application affiche cette information à l'écran, ou l'utilise pour une autre action.

Tout cela se produit en une fraction de seconde, souvent plusieurs fois par minute sur une seule application.

## Les API gratuites, limitées ou payantes

| Type d'accès | Ce que ça signifie | Pour qui c'est adapté |
|---|---|---|
| Gratuit sans limite | Accès libre, sans clé ni quota | Petits projets d'apprentissage |
| Gratuit avec quota | Un nombre de demandes limité par jour ou par mois | Projets personnels, tests |
| Payant à l'usage | Facturation selon le volume de demandes envoyées | Applications avec beaucoup d'utilisateurs |
| Payant par abonnement | Un tarif fixe pour un accès régulier | Entreprises avec un usage stable |

Beaucoup de services proposent un usage gratuit limité, puis un tarif selon le volume consommé. Lis toujours les conditions d'utilisation avant de construire un projet qui en dépend, car une API peut changer de prix ou fermer son accès gratuit.

<div class="attention">

**Protège tes clés d'accès**

Une clé d'API est un secret, au même titre qu'un mot de passe. Si elle est publiée dans un code partagé en ligne, par erreur ou par négligence, n'importe qui peut l'utiliser à tes frais. Elle peut aussi donner accès à des données qui ne lui sont pas destinées. Garde-la toujours hors du code visible publiquement.

</div>

## Les erreurs à éviter

- **Publier sa clé d'API dans un code partagé.** Même un dépôt « privé » peut devenir public par erreur. Garde les clés dans un fichier séparé, jamais envoyé en ligne.
- **Ignorer les quotas.** Dépasser la limite gratuite peut bloquer l'application ou déclencher une facturation imprévue.
- **Ne pas lire le format de réponse.** Une application qui attend un format et en reçoit un autre plante sans explication claire.
- **Oublier que le service peut changer.** Une API peut évoluer, se fermer ou changer de prix. Prévoir une alternative évite une mauvaise surprise.

## Les mots à connaître

<div class="lexique">

**API** : ensemble de règles qui permet à deux logiciels d'échanger des informations.

**Requête** : demande envoyée à une API, avec les informations nécessaires.

**Clé d'API** : identifiant secret qui autorise l'accès à un service.

**JSON** : format de texte structuré, souvent utilisé pour les réponses d'une API.

**Quota** : nombre de demandes autorisées sur une période donnée, au-delà duquel l'accès peut être limité ou facturé.

</div>

## Questions fréquentes

### Une API est-elle un logiciel ?

Pas exactement. C'est un ensemble de règles et de points d'accès, mis en place par un logiciel pour que d'autres programmes puissent l'utiliser.

### Faut-il savoir programmer pour utiliser une API ?

Il faut un peu de code pour l'appeler depuis un programme. Certaines plateformes proposent aussi des outils sans code qui connectent des API entre elles.

### Une API est-elle toujours gratuite ?

Non. Beaucoup offrent un usage gratuit limité, puis un tarif selon le volume consommé. Lis toujours les conditions avant de construire un projet dessus.

### Peut-on utiliser une API sans créer de compte ?

Rarement pour un usage régulier. La plupart des services demandent une inscription, pour générer une clé et suivre la consommation de chaque utilisateur.

## Et maintenant ?

Pour les bases de la programmation, lis [C'est quoi la programmation, concrètement ?](/c-est-quoi-la-programmation/). Pour comprendre la logique qui précède tout code, lis [C'est quoi un algorithme ?](/c-est-quoi-un-algorithme/). Et pour choisir ton premier langage, découvre [Quel langage de programmation apprendre en premier ?](/quel-langage-apprendre-en-premier/).
