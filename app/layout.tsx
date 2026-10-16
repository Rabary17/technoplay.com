import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_LANG,
  SOCIAL_LINKS,
  COMPANY,
  GA_MEASUREMENT_ID,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { CATEGORIES, categoryUrl } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import "./globals.css";

// next/font : auto-hébergé au build (aucune requête vers
// fonts.googleapis.com au chargement, pas de flash de police), et injecte
// --font-display/--font-body comme variables CSS sur <html> — consommées
// telles quelles dans app/globals.css. Poids repris de l'identité livrée
// (Bricolage Grotesque 600/700 pour les titres, Inter 400/500/600 pour le
// texte courant).
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Menu principal = les 6 thèmes à plat (structure du 2026-10-07, voir
// lib/categories.ts).
// Pages E-E-A-T (décision du 2026-09-30) : elles doivent rester
// atteignables en un clic depuis n'importe où sur le site — elles sont
// dans le pied de page, présent sur toutes les pages.
const INFO_LINKS = [
  { label: "À propos", href: "/a-propos/" },
  { label: "La rédaction", href: "/a-propos/#la-redaction" },
  { label: "Atelier IA", href: "/atelier-ia/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
  { label: "Mentions légales", href: "/mentions-legales/" },
  { label: "Confidentialité", href: "/confidentialite/" },
];

const DEFAULT_OG_IMAGE = {
  url: "/covers/default.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

// metadataBase permet à toutes les pages de déclarer des chemins relatifs
// pour openGraph.images etc. — résolus automatiquement en URL absolues.
// icons : icon.svg s'adapte seul au mode sombre (voir public/icon.svg) ;
// les PNG sont des dérivés figés pour les contextes qui n'acceptent pas le
// SVG (favicon d'onglet sur de vieux navigateurs, icône iOS "ajouter à
// l'écran d'accueil") — régénérés par npm run generate-favicons.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_LANG} className={`${bricolage.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics 4 (balise gtag.js d'origine, dans le <head> pour
            que Google la détecte, y compris pour valider la Search Console).
            Production uniquement : rien n'est chargé en `npm run dev`. */}
        {GA_MEASUREMENT_ID && process.env.NODE_ENV === "production" && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <header className="site-header">
          <div className="container">
            <a className="site-logo" href="/" aria-label={`${SITE_NAME}, accueil`}>
              <img src="/icon.svg" alt="" width={32} height={32} />
              <span>{SITE_NAME}</span>
            </a>
            <nav className="site-nav" aria-label="Navigation principale">
              {CATEGORIES.map((category) => {
                const articles = getPostsByCategory(category.slug);
                return (
                  <details key={category.slug} className="menu-item">
                    <summary>{category.short}</summary>
                    <div className="menu-panel">
                      <a className="menu-panel__tout" href={categoryUrl(category)}>
                        Tout le thème « {category.short} »
                      </a>
                      {articles.length > 0 ? (
                        <ul>
                          {articles.map((p) => (
                            <li key={p.slug}>
                              <a href={`/${p.slug}/`}>{p.title}</a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </details>
                );
              })}
              <a className="site-nav__atelier" href="/atelier-ia/">Atelier IA</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <a className="site-logo site-logo--footer" href="/" aria-label={`${SITE_NAME}, accueil`}>
                  <img src="/icon.svg" alt="" width={28} height={28} />
                  <span>{SITE_NAME}</span>
                </a>
                <p className="footer-tagline">
                  Le QG des débutants en tech : des explications simples, des
                  exemples concrets, zéro jargon.
                </p>
              </div>
              <nav aria-label="Thèmes">
                <span className="footer-heading">Thèmes</span>
                <div className="footer-links">
                  {CATEGORIES.map((category) => (
                    <a key={category.slug} href={categoryUrl(category)}>
                      {category.title}
                    </a>
                  ))}
                </div>
              </nav>
              <nav aria-label="Informations">
                <span className="footer-heading">Informations</span>
                <div className="footer-links">
                  {INFO_LINKS.map((link) => (
                    <a key={link.href} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
              {SOCIAL_LINKS.length > 0 && (
                <nav aria-label="Réseaux sociaux">
                  <span className="footer-heading">Nous suivre</span>
                  <div className="footer-links">
                    {SOCIAL_LINKS.map((social) => (
                      <a key={social.url} href={social.url} target="_blank" rel="noreferrer me">
                        {social.label}
                      </a>
                    ))}
                  </div>
                </nav>
              )}
            </div>
            <p className="footer-bottom">
              © {new Date().getFullYear()} {SITE_NAME}, un média édité par{" "}
              {COMPANY.nom} ({COMPANY.adresse.ville}, {COMPANY.adresse.pays}). Tous
              droits réservés.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
