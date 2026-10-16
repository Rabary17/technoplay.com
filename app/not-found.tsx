import Breadcrumbs from "@/components/Breadcrumbs";
export default function NotFound() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Page introuvable", href: "/404/" }]} />
      <h1>Page introuvable</h1>
      <p>Cette page n&apos;existe pas ou plus.</p>
      <p>
        <a href="/">Retour à l&apos;accueil</a>
      </p>
    </div>
  );
}
