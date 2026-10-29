import { z } from "zod";
import { FORMATIONS } from "@/lib/formations";
import { SITE } from "@/lib/site";

export const SERVICE_OPTIONS = [
  "Suivi et évaluation des projets",
  "Surveillance épidémiologique",
  "Communication institutionnelle & marketing",
  "Informatique & analyse de données",
  "Autre / à préciser",
] as const;

export const SUPPORT_OPTIONS = [
  "Mentorat sur-mesure",
  "Formation en leadership",
  "Appui technique (structurer / formaliser le projet)",
] as const;

const required = "Ce champ est obligatoire.";
const emailMsg = "Indiquez une adresse e-mail valide.";

export const inscriptionSchema = z.object({
  name: z.string().trim().min(2, required),
  email: z.string().trim().email(emailMsg),
  phone: z.string().trim().min(8, "Indiquez un numéro de téléphone."),
  city: z.string().trim().min(2, required),
  formation: z.string().min(1, "Choisissez une formation."),
  situation: z.string().optional(),
  message: z.string().trim().optional(),
  consent: z.boolean().refine((v) => v, { message: "Veuillez accepter le traitement de vos données." }),
});

export const devisSchema = z.object({
  name: z.string().trim().min(2, required),
  organization: z.string().trim().min(2, required),
  role: z.string().trim().optional(),
  email: z.string().trim().email(emailMsg),
  phone: z.string().trim().min(8, "Indiquez un numéro de téléphone."),
  orgType: z.string().min(1, "Précisez le type d'organisation."),
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service."),
  need: z.string().trim().min(20, "Décrivez votre besoin (20 caractères minimum)."),
  timeline: z.string().trim().optional(),
  consent: z.boolean().refine((v) => v, { message: "Veuillez accepter le traitement de vos données." }),
});

export const accompagnementSchema = z.object({
  name: z.string().trim().min(2, required),
  email: z.string().trim().email(emailMsg),
  phone: z.string().trim().min(8, "Indiquez un numéro de téléphone."),
  city: z.string().trim().min(2, required),
  stage: z.string().min(1, "Indiquez le stade de votre projet."),
  supports: z.array(z.string()).min(1, "Sélectionnez au moins un type d'appui."),
  project: z.string().trim().min(20, "Décrivez votre projet (20 caractères minimum)."),
  consent: z.boolean().refine((v) => v, { message: "Veuillez accepter le traitement de vos données." }),
});

export type InscriptionValues = z.infer<typeof inscriptionSchema>;
export type DevisValues = z.infer<typeof devisSchema>;
export type AccompagnementValues = z.infer<typeof accompagnementSchema>;

export type PreparedRequest = { subject: string; body: string };

function lines(rows: [string, string | undefined][]) {
  return rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k} : ${v!.trim()}`)
    .join("\n");
}

export function prepareInscription(values: InscriptionValues): PreparedRequest {
  const formation = FORMATIONS.find((f) => f.slug === values.formation)?.title ?? values.formation;
  return {
    subject: `Candidature formation — ${formation}`,
    body: lines([
      ["Formulaire", "Candidature à une formation"],
      ["Nom", values.name],
      ["E-mail", values.email],
      ["Téléphone", values.phone],
      ["Ville", values.city],
      ["Formation", formation],
      ["Situation", values.situation],
      ["Message", values.message],
    ]),
  };
}

export function prepareDevis(values: DevisValues): PreparedRequest {
  return {
    subject: `Demande de devis — ${values.organization}`,
    body: lines([
      ["Formulaire", "Demande de devis (organisations)"],
      ["Nom", values.name],
      ["Organisation", values.organization],
      ["Fonction", values.role],
      ["Type d'organisation", values.orgType],
      ["E-mail", values.email],
      ["Téléphone", values.phone],
      ["Services", values.services.join(", ")],
      ["Délai souhaité", values.timeline],
      ["Besoin", values.need],
    ]),
  };
}

export function prepareAccompagnement(values: AccompagnementValues): PreparedRequest {
  return {
    subject: `Demande d'accompagnement — entrepreneuriat féminin — ${values.name}`,
    body: lines([
      ["Formulaire", "Demande d'appui — entrepreneuriat féminin"],
      ["Nom", values.name],
      ["E-mail", values.email],
      ["Téléphone", values.phone],
      ["Ville / quartier", values.city],
      ["Stade du projet", values.stage],
      ["Appui souhaité", values.supports.join(", ")],
      ["Projet", values.project],
    ]),
  };
}

export function mailtoHref(request: PreparedRequest) {
  return `mailto:${SITE.emails[0]}?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(request.body)}`;
}

export function whatsappHref(request: PreparedRequest) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`${request.subject}\n\n${request.body}`)}`;
}
