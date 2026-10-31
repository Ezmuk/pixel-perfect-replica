export const SITE = {
  name: "APA — Académie Professionnelle d'Afrique",
  shortName: "APA",
  url: "https://apa-goma.lovable.app",
  emails: ["info@fat.org", "krcmdrc@gmail.com"],
  phones: [
    { display: "+243 992 546 984", tel: "+243992546984" },
    { display: "+254 703 108 250", tel: "+254703108250" },
  ],
  // Number used by the floating WhatsApp button — confirm before publishing.
  whatsapp: "243992546984",
  addresses: {
    contact:
      "Quartier Kyeshero, Avenue Kanyambongo, Rez-de-chaussée de l'Église La Borne, Goma, RDC",
    intro: "À l'étage du bâtiment après la Sampietia / Cathédrale, Goma, RDC",
  },
} as const;

export const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/formations", label: "Formations" },
  { to: "/services", label: "Services" },
  { to: "/entrepreneuriat-feminin", label: "Entrepreneuriat féminin" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Journal" },
  { to: "/gallery", label: "Galerie" },
] as const;

export function pageMeta(title: string, description: string, path: string) {
  const url = SITE.url + path;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
