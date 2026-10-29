import { createFileRoute } from "@tanstack/react-router";
import { Users, Award, Wrench } from "lucide-react";
import femmes from "@/assets/femmes-entrepreneures.jpg";
import { pageMeta, SITE } from "@/lib/site";
import { CtaBand, PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/entrepreneuriat-feminin")({
  head: () =>
    pageMeta(
      "Entrepreneuriat féminin à Goma — Mentorat et leadership | APA",
      "Mentorat sur-mesure, formations en leadership et appui technique : l'APA accompagne les femmes entrepreneures de Goma et de la région des Grands Lacs.",
      "/entrepreneuriat-feminin",
    ),
  component: Women,
});

function Women() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Entrepreneuriat féminin" }]} title="L'autonomisation au féminin : notre priorité" intro="Parce que l'avenir économique de notre région passe par le leadership féminin, l'APA dédie un pôle stratégique à l'accompagnement des femmes entrepreneures." />
      <section className="container-apa grid items-start gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Nous brisons les barrières d'accès aux opportunités</h2>
          <ul className="mt-8 space-y-6">
            {[
              { icon: Users, t: "Mentorat sur-mesure", d: "Des programmes de mentorat adaptés à votre projet." },
              { icon: Award, t: "Leadership", d: "Des formations intensives en leadership." },
              { icon: Wrench, t: "Appui technique", d: "Structurer, formaliser et pérenniser vos projets." },
            ].map((x) => (
              <li key={x.t} className="flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground"><x.icon className="size-5" /></span>
                <div><h3 className="font-semibold">{x.t}</h3><p className="text-muted-foreground">{x.d}</p></div>
              </li>
            ))}
          </ul>
          <blockquote className="mt-10 border-l-4 border-brand-orange pl-5 text-lg font-medium text-primary-deep">
            Notre objectif : transformer chaque initiative portée par une femme en une entreprise structurée, résiliente et génératrice d'emplois.
          </blockquote>
          <a href={`mailto:${SITE.emails[0]}?subject=${encodeURIComponent("Demande d'accompagnement — entrepreneuriat féminin")}`} className="btn btn-orange mt-8">Demander un accompagnement</a>
        </div>
        <img src={femmes} alt="Femme entrepreneure travaillant sur son plan d'affaires dans son atelier" width={1200} height={1200} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
      </section>
      <CtaBand />
    </>
  );
}
