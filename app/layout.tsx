import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_LANG,
  SOCIAL_LINKS,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Navigation E-E-A-T (décision du 2026-09-30) : ces pages doivent être
// atteignables en un clic depuis n'importe où sur le site, pas seulement
// via des liens internes ponctuels — c'est aussi ce qui aide Google à les
// découvrir et à les associer au site dans son ensemble.
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

// metadataBase permet à toutes les pages de déclarer des chemins relatifs
// pour openGraph.images etc. — résolus automatiquement en URL absolues.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_LANG}>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <header className="site-header">
          <a className="site-title" href="/">
            {SITE_NAME}
          </a>
          <nav className="site-nav">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <nav className="footer-nav">
            <a href="/mentions-legales/">Mentions légales</a>
            <a href="/confidentialite/">Confidentialité</a>
            {SOCIAL_LINKS.map((social) => (
              <a key={social.url} href={social.url} target="_blank" rel="noreferrer me">
                {social.label}
              </a>
            ))}
          </nav>
          <p>
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
        </footer>
      </body>
    </html>
  );
}
