// Catalogue derived from the APA profile. Practical details (durée, frais,
// horaires, prérequis, modalité) are not in the profile, so they stay null
// and render as "Information à confirmer" until APA provides them.
export type Formation = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  duration: string | null;
  fees: string | null;
  schedule: string | null;
  prerequisites: string | null;
  mode: string | null;
  enrollment: "ouvert" | "a-confirmer" | "ferme";
};

export const CATEGORIES = [
  { id: "langues", title: "Langues & Communication", text: "Anglais professionnel et techniques d'interprétation." },
  { id: "data", title: "Informatique & Data Science", text: "Bureautique, Excel avancé, bases de données, SPSS, Stata, KoboCollect." },
  { id: "metiers", title: "Métiers vocationnels & techniques", text: "Menuiserie, plomberie, électricité, carrelage, peinture et ajustage." },
  { id: "entrepreneuriat", title: "Entrepreneuriat & Incubation", text: "Création d'entreprise et encadrement des jeunes." },
] as const;

const base = { duration: null, fees: null, schedule: null, prerequisites: null, mode: null, enrollment: "a-confirmer" as const };

export const FORMATIONS: Formation[] = [
  { ...base, slug: "anglais-professionnel-interpretation", category: "langues", title: "Anglais professionnel & interprétation",
    summary: "Communiquer avec aisance en anglais dans un cadre professionnel.",
    description: "Formation en anglais professionnel et en techniques d'interprétation, pour les professionnels, chercheurs d'emploi et jeunes souhaitant renforcer leur communication." },
  { ...base, slug: "bureautique-excel-avance", category: "data", title: "Informatique bureautique & Excel avancé",
    summary: "Maîtriser les outils bureautiques et les fonctions avancées d'Excel.",
    description: "Programme pratique couvrant l'informatique bureautique et l'utilisation avancée d'Excel pour le travail quotidien et l'analyse." },
  { ...base, slug: "gestion-bases-de-donnees", category: "data", title: "Gestion des bases de données",
    summary: "Structurer, gérer et exploiter des bases de données.",
    description: "Formation à la gestion des bases de données, de la structuration de l'information à son exploitation." },
  { ...base, slug: "spss", category: "data", title: "Logiciel statistique SPSS",
    summary: "Analyser des données avec SPSS.",
    description: "Maîtrise du logiciel statistique SPSS pour le traitement et l'analyse de données." },
  { ...base, slug: "stata", category: "data", title: "Logiciel statistique Stata",
    summary: "Analyser des données avec Stata.",
    description: "Maîtrise du logiciel statistique Stata pour le traitement et l'analyse de données." },
  { ...base, slug: "kobocollect", category: "data", title: "Collecte de données avec KoboCollect",
    summary: "Concevoir et mener des collectes de données mobiles.",
    description: "Maîtrise de l'outil de collecte KoboCollect pour concevoir des formulaires et collecter des données sur le terrain." },
  { ...base, slug: "menuiserie", category: "metiers", title: "Menuiserie", summary: "Formation pratique aux techniques de menuiserie.", description: "Formation pratique en menuiserie, orientée vers l'insertion professionnelle." },
  { ...base, slug: "plomberie", category: "metiers", title: "Plomberie", summary: "Formation pratique aux techniques de plomberie.", description: "Formation pratique en plomberie, orientée vers l'insertion professionnelle." },
  { ...base, slug: "electricite", category: "metiers", title: "Électricité", summary: "Formation pratique aux installations électriques.", description: "Formation pratique en électricité, orientée vers l'insertion professionnelle." },
  { ...base, slug: "carrelage", category: "metiers", title: "Carrelage", summary: "Formation pratique à la pose de carrelage.", description: "Formation pratique en carrelage, orientée vers l'insertion professionnelle." },
  { ...base, slug: "peinture", category: "metiers", title: "Peinture", summary: "Formation pratique en peinture du bâtiment.", description: "Formation pratique en peinture, orientée vers l'insertion professionnelle." },
  { ...base, slug: "ajustage", category: "metiers", title: "Ajustage", summary: "Formation pratique en ajustage.", description: "Formation pratique en ajustage, orientée vers l'insertion professionnelle." },
  { ...base, slug: "entrepreneuriat-incubation", category: "entrepreneuriat", title: "Entrepreneuriat & incubation",
    summary: "Être accompagné dans la création de son entreprise.",
    description: "Accompagnement à la création d'entreprise et encadrement des jeunes porteurs de projets." },
];

export const getFormation = (slug: string) => FORMATIONS.find((f) => f.slug === slug);
export const categoryTitle = (id: string) => CATEGORIES.find((c) => c.id === id)?.title ?? "";
