import type { Metadata } from "next";
import { PROGRAMMES } from "@/lib/atelier-ia";
import Breadcrumbs from "@/components/Breadcrumbs";
import AtelierProgramme from "@/components/AtelierProgramme";

const programme = PROGRAMMES[1];

export const metadata: Metadata = {
  title: "Atelier lycéens : ateliers IA du Novembre numérique 2026",
  description: `${programme.titre}. ${programme.objectif}`,
  alternates: { canonical: "/atelier-ia/lyceens/" },
};

// Page dédiée à l'atelier « Atelier lycéens ». Le contenu vient de lib/atelier-ia.ts.
export default function Page() {
  return (
    <div className="page">
      <Breadcrumbs
        items={[
          { name: "Accueil", href: "/" },
          { name: "Atelier IA", href: "/atelier-ia/" },
          { name: "Atelier lycéens", href: "/atelier-ia/lyceens/" },
        ]}
      />
      <h1>{programme.titre}</h1>
      <AtelierProgramme programme={programme} />
      <p>
        <a href="/atelier-ia/">← Voir les deux ateliers</a>
      </p>
    </div>
  );
}
