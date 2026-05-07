import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLdRestaurant } from "./json-ld";
import { absoluteUrl, siteConfig, siteUrl } from "./site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.shortName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "PEC",
    "Pizza e Casa",
    "pizzeria Ille-sur-Têt",
    "pizza artisanale",
    "pizza 66",
    "livraison pizza Ille-sur-Têt",
    "restaurant Ille-sur-Têt",
  ],
  authors: [{ name: siteConfig.shortName }],
  creator: siteConfig.shortName,
  publisher: siteConfig.shortName,
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: `${siteConfig.shortName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/logo-pec.png"),
        width: 512,
        height: 512,
        alt: `${siteConfig.shortName} — logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [absoluteUrl("/logo-pec.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <JsonLdRestaurant />
        {children}
      </body>
    </html>
  );
}
