import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, HeartPulse, Megaphone, Cpu } from "lucide-react";
import { pageMeta, SITE } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";

export const SERVICES = [
  { icon: BarChart3, title: "Suivi et évaluation des projets", text: "Conception de frameworks, collecte de données et mesure d'impact." },
  { icon: HeartPulse, title: "Surveillance épidémiologique", text: "Appui technique et formation en santé publique." },
  { icon: Megaphone, title: "Communication institutionnelle & marketing", text: "Stratégies de positionnement et visibilité." },
  { icon: Cpu, title: "Informatique & analyse de données", text: "Traitement de données complexes et digitalisation des processus." },
];

export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Conseil pour ONG, entreprises et institutions à Goma | APA",
      "Suivi-évaluation, surveillance épidémiologique, communication institutionnelle et analyse de données : l'appui-conseil de l'APA pour les organisations en RDC.",
      "/services",
    ),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Services" }]} title="Solutions institutionnelles & conseil" intro="Un accompagnement sur-mesure pour les ONG, les entreprises privées et les institutions de l'État." />
      <section className="container-apa py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.title} className="card-apa p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground"><s.icon className="size-6" /></span>
              <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-xl bg-primary-deep p-8 md:p-12">
          <h2 className="text-2xl font-bold text-primary-foreground">Demander un devis</h2>
          <p className="mt-3 max-w-xl text-primary-foreground/80">Décrivez votre organisation et votre besoin : notre équipe revient vers vous avec une proposition adaptée.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.emails[0]}?subject=${encodeURIComponent("Demande de devis")}`} className="btn btn-orange">Écrire à l'équipe</a>
            <Link to="/contact" className="btn btn-ghost-light">Toutes les coordonnées</Link>
          </div>
        </div>
      </section>
    </>
  );
}
