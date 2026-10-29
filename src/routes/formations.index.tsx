import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import metiers from "@/assets/metiers-techniques.jpg";
import { CATEGORIES, FORMATIONS } from "@/lib/formations";
import { pageMeta } from "@/lib/site";
import { CtaBand, PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/formations/")({
  head: () =>
    pageMeta(
      "Formations professionnelles à Goma — Langues, data, métiers | APA",
      "Anglais professionnel, Excel avancé, SPSS, Stata, KoboCollect, menuiserie, plomberie, électricité et entrepreneuriat : les formations de l'APA à Goma.",
      "/formations",
    ),
  component: Formations,
});

function Formations() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Formations" }]} title="Formation professionnelle & insertion" intro="Des programmes pratiques pour les professionnels, les chercheurs d'emploi et les jeunes." />
      <div className="container-apa space-y-16 py-16">
        {CATEGORIES.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="scroll-mt-24">
            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
              <div>
                <h2 id={`h-${c.id}`} className="text-2xl font-bold">{c.title}</h2>
                <span className="rule-orange mt-4" />
                <p className="mt-4 text-muted-foreground">{c.text}</p>
                {c.id === "metiers" && <img src={metiers} alt="Apprenants en atelier d'électricité et de menuiserie" width={1200} height={912} loading="lazy" className="mt-6 hidden rounded-xl md:block" />}
              </div>
              <ul className="grid content-start gap-4 sm:grid-cols-2">
                {FORMATIONS.filter((f) => f.category === c.id).map((f) => (
                  <li key={f.slug}>
                    <Link to="/formations/$slug" params={{ slug: f.slug }} className="card-apa group flex h-full flex-col p-6 transition-colors hover:border-primary">
                      <h3 className="text-lg font-semibold group-hover:text-primary">{f.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Détails <ArrowRight className="size-4" /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
