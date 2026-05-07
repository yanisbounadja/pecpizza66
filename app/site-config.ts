/** URL publique du site (obligatoire en prod pour OG, canonical, JSON-LD). */
function normalizeSiteUrl(): string {
  let raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  if (!raw) return "http://localhost:3000";
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  try {
    const u = new URL(raw);
    return u.href.replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

export const siteUrl = normalizeSiteUrl();

export const siteConfig = {
  name: "PEC — Pizza e Casa",
  shortName: "PEC",
  tagline: "Pizzeria artisanale à Ille-sur-Têt",
  description:
    "PEC — Pizza e Casa : pizzeria artisanale à Ille-sur-Têt. Pizzas généreuses, pâte travaillée, ingrédients sélectionnés. Commander ou nous contacter.",
  locale: "fr_FR",
  streetAddress: "59 avenue Pasteur",
  postalCode: "66130",
  addressLocality: "Ille-sur-Têt",
  addressCountry: "FR",
  /** Format international pour Schema.org et liens tel:. */
  telephone: "+33468367934",
  /** Affichage lisible sur le site. */
  telephoneDisplay: "04 68 36 79 34",
  geo: {
    latitude: 42.6739,
    longitude: 2.6214,
  },
} as const;

export function absoluteUrl(path: string) {
  const base = siteUrl;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
