import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `Qui est derrière ${SITE_NAME}, et pourquoi ce site existe.`,
  alternates: { canonical: "/a-propos/" },
};

// Page E-E-A-T centrale : Google (et un lecteur humain) veut savoir qui
// publie, pourquoi, et selon quels principes. TODO : remplacer ce texte
// générique par la vraie histoire/ligne éditoriale une fois définie —
// voir README.md "À compléter avant publication".
export default function AboutPage() {
  return (
    <div className="page">
      <h1>À propos de {SITE_NAME}</h1>
      <p>
        {SITE_NAME} est un média indépendant consacré à l&apos;actualité tech,
        aux tests et aux décryptages — sans jargon inutile.
      </p>

      <h2>Notre ligne éditoriale</h2>
      <p>
        {/* TODO : préciser la vraie ligne éditoriale — sujets couverts,
            fréquence de publication, ce qui distingue ce site d'un autre. */}
        Chaque article est écrit pour être utile en premier lieu — pas pour
        remplir une grille de mots-clés. Quand un test ou un chiffre est cité,
        il est vérifié, jamais inventé.
      </p>

      <h2>Qui écrit</h2>
      <p>
        {/* TODO : vraie bio de l'auteur/équipe — nom, parcours, ce qui
            légitime l'expertise sur ces sujets. Un lien vers un profil
            LinkedIn/X vérifiable renforce ce signal. */}
        Contenu rédigé par l&apos;équipe {SITE_NAME}. Retrouvez-nous sur les
        réseaux listés en pied de page.
      </p>

      <h2>Nous contacter</h2>
      <p>
        Une question, une correction à signaler, une proposition ? La page{" "}
        <a href="/contact/">contact</a> est le meilleur moyen de nous joindre.
      </p>
    </div>
  );
}
