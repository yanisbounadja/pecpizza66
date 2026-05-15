import { absoluteUrl, siteConfig } from "./site-config";

export function JsonLdRestaurant() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${absoluteUrl("/")}#restaurant`,
    name: siteConfig.name,
    description: siteConfig.description,
    image: [absoluteUrl("/logo-pec.png")],
    url: absoluteUrl("/"),
    telephone: siteConfig.telephone,
    priceRange: "€€",
    servesCuisine: ["Italian", "Pizza"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "18:00",
        closes: "22:00",
      },
    ],
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gomanger.fr/restaurants/ille-sur-tet/1132/pizza-pec",
        inLanguage: "fr-FR",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
