---
title: "C'est quoi un token ? L'unité qui fait lire, retenir et payer une IA"
seoTitle: "Token IA : c'est quoi et à quoi ça sert ?"
description: "Un token, c'est le morceau de texte que lit une IA. Il mesure aussi sa mémoire et son prix. Exemple sur une phrase et ordres de grandeur."
date: "2026-11-02"
author: "andrianina-rabarivelo"
category: "intelligence-artificielle"
sources:
  - titre: "OpenAI : What are tokens and how to count them?"
    url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them"
  - titre: "OpenAI : Tokenizer (outil de découpage en ligne)"
    url: "https://platform.openai.com/tokenizer"
  - titre: "OpenAI : grille tarifaire de l'API"
    url: "https://openai.com/api/pricing/"
  - titre: "VentureBeat : OpenAI releases GPT-6 Sol and Luna models, slashing API costs (septembre 2026)"
    url: "https://venturebeat.com/technology/openai-releases-gpt-6-sol-and-luna-models-slashing-api-costs-50-or-more"
sourcesConsultees: "2026-11-02"
---

***Un token, c'est le petit morceau de texte qu'une IA lit et écrit, à la place des mots entiers. Cette unité discrète décide de ce qu'elle comprend, de ce qu'elle retient et de ce qu'elle coûte.***

<div class="essentiel">

**L'essentiel en 30 secondes**

- Une IA ne lit pas des mots mais des tokens, des morceaux de quelques lettres. En anglais, un token fait environ 4 caractères.
- Le token mesure sa mémoire : la fenêtre de contexte se compte en tokens, et ce qui dépasse est oublié.
- Le token sert aussi d'unité de prix : les API facturent au million de tokens, en entrée et en sortie.

</div>

Quand tu écris « Bonjour, comment vas-tu ? » à un assistant, il ne voit ni ta phrase, ni tes mots. Il reçoit une suite de nombres, chacun correspondant à un morceau de texte. Ces morceaux s'appellent des tokens. Ils expliquent pourquoi une IA bute sur certains mots, oublie le début d'une longue discussion et facture ses services au volume.

## C'est quoi un token, en pratique ?

Un **token** est l'unité de base qu'un modèle de langage manipule. Ce n'est ni une lettre ni un mot : c'est un morceau de texte de taille variable. Un mot courant comme « maison » tient souvent dans un seul token. Un mot rare ou long se découpe en plusieurs morceaux.

Avant d'arriver au modèle, ton texte passe par un **tokenizer**, un programme de découpage. Il consulte un dictionnaire de morceaux, souvent fort de 100 000 à 200 000 entrées. Il remplace ensuite chaque morceau par son numéro dans ce dictionnaire. Le modèle ne travaille que sur ces numéros.

Ce dictionnaire n'a pas été écrit à la main. On l'a construit automatiquement, en repérant les suites de lettres les plus fréquentes dans d'énormes quantités de textes. Les morceaux qui reviennent souvent, comme « tion » ou « ment », gagnent leur propre entrée. Les espaces et la ponctuation comptent aussi : une virgule ou un point forment souvent un token à eux seuls.

## Un exemple de découpage sur une phrase française

Prenons une phrase simple : « Les intelligences artificielles apprennent vite. » Voici un découpage possible, avec une barre entre chaque token.

<div class="exemple">

**Un exemple concret**

Les | intellig | ences | artific | ielles | appren | nent | vite | .

Neuf tokens pour six éléments (cinq mots et un point). « Les » et « vite » passent d'un bloc, car ils sont très fréquents. « Intelligences » et « artificielles », plus longs, se coupent en deux. Le point final compte pour un token.

</div>

Le découpage exact change d'un modèle à l'autre, car chaque éditeur entraîne son propre tokenizer. Pour voir le vrai résultat, OpenAI propose un outil gratuit, le **Tokenizer**. Tu y colles un texte et chaque token apparaît dans une couleur différente.

Le français coûte en général plus de tokens que l'anglais pour le même contenu. Les dictionnaires de morceaux ont été construits sur des textes majoritairement anglais. Les mots anglais y trouvent donc plus souvent une entrée complète. Une phrase française se découpe en plus de morceaux, ce qui pèse sur la mémoire et sur la facture.

## Combien de tokens pour un texte ?

OpenAI donne une règle approximative pour l'anglais : **un token correspond à environ 4 caractères**, soit trois quarts de mot. Cent tokens représentent donc environ 75 mots anglais. En français, compte plutôt **3 à 4 caractères par token**, à cause des mots plus longs et des accents.

| Texte | Longueur approximative | Tokens estimés |
|---|---|---|
| Un SMS | 30 mots | 40 à 50 |
| Un e-mail professionnel | 200 mots | 250 à 350 |
| Un article de blog | 1 500 mots | 2 000 à 2 500 |
| Un roman de poche | 80 000 mots | 100 000 à 130 000 |

Ces chiffres sont des ordres de grandeur. Un texte technique, rempli de chiffres, de code ou de noms propres, consomme davantage. Une liste de mots courants, beaucoup moins.

Retiens surtout la logique : plus ton texte est long et inhabituel, plus il coûte de tokens. Ça compte pour les trois rôles du token, qu'on détaille ci-dessous.

## Rôle n° 1 : le token, unité de travail

Un modèle de langage écrit **un token à la fois**. À chaque étape, il calcule le token le plus probable après ceux qui précèdent, l'ajoute à sa réponse et recommence. C'est pour ça que les réponses s'affichent par petits morceaux, et non d'un bloc.

Ce fonctionnement explique certaines faiblesses étonnantes. Demande à une IA combien de « r » contient le mot « arrière », elle se trompe parfois. Elle ne voit pas les lettres, seulement des morceaux comme « arr » et « ière ». Compter des lettres, si simple pour nous, l'oblige à un détour.

Le même problème touche les calculs. Un grand nombre comme 7 834 291 peut être découpé en plusieurs tokens arbitraires. Le modèle ne manipule pas des chiffres alignés comme sur une feuille, d'où des erreurs d'arithmétique. Les assistants récents contournent ce piège en confiant les calculs à un outil, une calculatrice ou un petit programme.

## Rôle n° 2 : le token, unité de mémoire

Une IA n'a sous les yeux qu'une quantité limitée de texte pendant une conversation. C'est la **fenêtre de contexte**, l'équivalent de la mémoire vive de ton ordinateur, comme l'explique notre article [Comment fonctionne une IA ?](/comment-fonctionne-une-ia/). Sa taille se mesure en tokens.

Tout y entre : ta question, les réponses précédentes, les documents joints et les consignes cachées de l'éditeur. Les modèles récents acceptent de quelques dizaines de milliers à un million de tokens. Un million de tokens, c'est l'équivalent de huit à dix romans.

Quand la conversation dépasse cette limite, les tokens les plus anciens sortent de la fenêtre. L'IA perd alors le fil de ce que tu lui as dit au début. Elle peut contredire une consigne donnée une heure plus tôt ou inventer un détail oublié. C'est une des causes d'erreur détaillées dans [Pourquoi l'IA se trompe-t-elle parfois ?](/pourquoi-ia-se-trompe/). Pour un long travail, ouvre une nouvelle conversation et redonne-lui un résumé.

## Rôle n° 3 : le token, unité de facturation

Pour les développeurs et les entreprises, les éditeurs d'IA facturent **au million de tokens**. Le prix distingue deux flux. Les tokens d'entrée correspondent à ce que tu envoies, les tokens de sortie à ce que le modèle écrit. Les tokens de sortie coûtent en général quatre à cinq fois plus cher.

Exemple avec la grille annoncée par OpenAI en septembre 2026. GPT-6 Sol est facturé **2 dollars par million de tokens en entrée et 10 dollars en sortie**. Un e-mail de 300 tokens, suivi d'une réponse de 300 tokens, coûte donc environ 0,4 centime de dollar. Les tarifs changent souvent : vérifie la grille officielle avant de faire un budget.

Si tu utilises ChatGPT, Claude ou Gemini avec un abonnement mensuel, tu ne paies pas au token. Mais les tokens comptent quand même : les limites d'usage des formules, comme le nombre de messages ou la taille des fichiers, en découlent. Une longue conversation avec des documents lourds épuise ton quota plus vite qu'une série de questions courtes.

<div class="lexique">

**Les mots à connaître**

- **Token** : morceau de texte, souvent une partie de mot, que l'IA lit et écrit.
- **Tokenizer** : programme qui découpe un texte en tokens et les transforme en numéros.
- **Fenêtre de contexte** : quantité maximale de tokens que l'IA peut prendre en compte à la fois.
- **Tokens d'entrée** : tokens du texte envoyé au modèle (question, documents, historique).
- **Tokens de sortie** : tokens du texte écrit par le modèle, en général plus chers.

</div>

## Questions fréquentes

### Combien de mots dans 1 000 tokens ?

Environ 750 mots en anglais, et plutôt 600 à 700 mots en français. Le chiffre varie selon le modèle et le type de texte : le code et les chiffres consomment plus de tokens.

### Pourquoi les IA comptent-elles en tokens et pas en mots ?

Un dictionnaire de mots entiers serait gigantesque et ne couvrirait jamais les fautes, les noms propres ou les mots inventés. Les tokens permettent de recomposer n'importe quel texte avec un vocabulaire limité.

### Un token coûte-t-il la même chose partout ?

Non. Chaque éditeur et chaque modèle a son tarif. Les modèles les plus puissants coûtent plusieurs dizaines de fois plus cher que les modèles légers, et la sortie coûte plus que l'entrée.

### Comment savoir combien de tokens fait mon texte ?

Colle-le dans un outil de découpage, comme le Tokenizer d'OpenAI. Il affiche le nombre exact de tokens et le découpage en couleurs, pour les modèles de cet éditeur.

### Les images et les fichiers audio se comptent-ils aussi en tokens ?

Oui. Les modèles qui lisent des images les découpent en petits carreaux convertis en tokens. Une photo peut ainsi coûter plusieurs centaines à plusieurs milliers de tokens, selon sa taille et le modèle.

## La suite de la série

Tu sais maintenant ce que lit une IA. L'article précédent de la série montre [comment fonctionne une IA, pièce par pièce](/comment-fonctionne-une-ia/). Le suivant raconte comment on fabrique un modèle, de la collecte des données jusqu'à sa sortie.
