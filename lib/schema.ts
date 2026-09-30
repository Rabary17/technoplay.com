// JSON-LD structuré (schema.org) — même logique que lib/schema.ts sur
// monauto/Techcars : chaque page injecte le schéma pertinent via le
// composant <JsonLd>. C'est ce qui alimente le GEO (Generative Engine
// Optimization) autant que le SEO classique — les moteurs génératifs
// s'appuient fortement sur ces données structurées.
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SOCIAL_LINKS } from "./site";
import type { Post } from "./posts";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    // `sameAs` : signal E-E-A-T reconnu par Google — relie l'entité du site
    // à une présence externe vérifiable (voir décision du 2026-09-30).
    // Remplacer par les vrais profils dans lib/site.ts avant publication.
    sameAs: SOCIAL_LINKS.map((s) => s.url),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/${post.slug}/`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
