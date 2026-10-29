import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, AlertTriangle } from "lucide-react";
import { pageMeta, SITE } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contacter l'APA à Goma — Téléphone, e-mail, adresse",
      "Coordonnées de l'Académie Professionnelle d'Afrique à Goma, RDC : téléphone, e-mail, WhatsApp et adresse.",
      "/contact",
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Contact" }]} title="Contactez-nous" intro="Prêt à propulser votre carrière ou à renforcer les performances de votre organisation ? Rejoignez-nous !" />
      <section className="container-apa grid gap-6 py-16 md:grid-cols-3">
        <div className="card-apa p-6">
          <Phone className="size-6 text-brand-orange" />
          <h2 className="mt-4 text-lg font-semibold">Téléphone</h2>
          {SITE.phones.map((p) => <p key={p.tel}><a href={`tel:${p.tel}`} className="font-medium text-primary">{p.display}</a></p>)}
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-success"><MessageCircle className="size-4" />WhatsApp</a>
        </div>
        <div className="card-apa p-6">
          <Mail className="size-6 text-brand-orange" />
          <h2 className="mt-4 text-lg font-semibold">E-mail</h2>
          {SITE.emails.map((e) => <p key={e}><a href={`mailto:${e}`} className="font-medium text-primary">{e}</a></p>)}
        </div>
        <div className="card-apa p-6">
          <MapPin className="size-6 text-brand-orange" />
          <h2 className="mt-4 text-lg font-semibold">Adresse</h2>
          <p>{SITE.addresses.contact}</p>
        </div>
      </section>
      <section className="container-apa pb-16">
        <div role="note" className="flex gap-3 rounded-lg border bg-warning p-5 text-warning-foreground">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm"><strong>Adresse à confirmer avant publication :</strong> le profil APA mentionne aussi « {SITE.addresses.intro} ». Les deux adresses diffèrent ; merci de confirmer laquelle afficher.</p>
        </div>
      </section>
    </>
  );
}
