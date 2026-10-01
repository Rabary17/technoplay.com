import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, LEGAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${SITE_NAME}.`,
  alternates: { canonical: "/mentions-legales/" },
  robots: { index: false, follow: true },
};

// Obligation légale française (LCEN art. 6-III) : identité de l'éditeur et
// de l'hébergeur. AUCUNE valeur n'est inventée ici — chaque champ vient de
// lib/site.ts (LEGAL), et un champ encore marqué "TODO" s'affiche tel quel,
// volontairement visible, plutôt que d'être masqué ou remplacé par un
// placeholder plausible. Ne PAS publier ce site avec des TODO restants dans
// cette page — voir README.md "À compléter avant publication".
export default function MentionsLegalesPage() {
  return (
    <div className="page">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>
        Nom / raison sociale : {LEGAL.editeur_nom}
        <br />
        Statut : {LEGAL.editeur_statut}
        <br />
        Adresse : {LEGAL.editeur_adresse}
        <br />
        SIRET : {LEGAL.editeur_siret}
        <br />
        Directeur de la publication : {LEGAL.directeur_publication}
      </p>

      <h2>Hébergement</h2>
      <p>
        {LEGAL.hebergeur_nom}
        <br />
        {LEGAL.hebergeur_adresse}
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus publiés sur {SITE_URL} (textes, images,
        mises en page) est protégé par le droit d&apos;auteur. Toute
        reproduction sans autorisation préalable est interdite, sauf
        courtes citations avec mention de la source.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ces mentions légales, voir la page{" "}
        <a href="/contact/">contact</a>.
      </p>
    </div>
  );
}
