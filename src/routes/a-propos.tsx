import { createFileRoute } from "@tanstack/react-router";
import training from "@/assets/apa-training.jpg";
import { pageMeta } from "@/lib/site";
import { CtaBand, PageHeader, SectionTitle } from "@/components/site/Layout";

export const VALUES = [
  { title: "Excellence", text: "Alignement de nos modules de formation sur les standards internationaux." },
  { title: "Intégrité", text: "Transparence totale et éthique professionnelle rigoureuse avec nos apprenants et partenaires." },
  { title: "Innovation", text: "Adaptation continue de nos méthodes aux évolutions technologiques et aux réalités du marché." },
  { title: "Impact social", text: "L'éducation comme levier pour transformer les communautés et réduire les inégalités." },
];

export const Route = createFileRoute("/a-propos")({
  head: () =>
    pageMeta(
      "À propos de l'APA — Vision, mission et valeurs | Goma",
      "Fondée en 2015 par la Fondation Africa Telema, l'Académie Professionnelle d'Afrique est ancrée à Goma, au cœur de la région des Grands Lacs.",
      "/a-propos",
    ),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader crumbs={[{ label: "À propos" }]} title="Qui sommes-nous ?" intro="Une institution panafricaine innovante, spécialisée dans le renforcement des capacités, la formation professionnelle et l'appui-conseil." />
      <section className="container-apa grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div className="space-y-5 text-lg leading-relaxed">
          <p>Fondée en <strong>2015</strong> par la <strong>Fondation Africa Telema</strong> à Kinshasa, l'APA a progressivement déployé son expertise sur l'ensemble de la République Démocratique du Congo.</p>
          <p>Aujourd'hui solidement ancrée à <strong>Goma</strong>, au cœur de la région des Grands Lacs, l'académie combine une approche multidisciplinaire et pragmatique pour répondre aux défis réels du marché de l'emploi et du développement.</p>
        </div>
        <img src={training} alt="Un formateur accompagne des apprenants pendant une séance de travail sur ordinateur" width={1600} height={1067} loading="lazy" className="w-full rounded-xl object-cover" />
      </section>
      <section className="bg-secondary py-16 md:py-20">
        <div className="container-apa grid gap-6 md:grid-cols-2">
          <article className="card-apa p-8">
            <p className="eyebrow">Vision 2030</p>
            <h2 className="mt-3 text-2xl font-bold">Notre vision</h2>
            <p className="mt-4 text-muted-foreground">Devenir le carrefour de référence dans la région des Grands Lacs pour l'excellence professionnelle, et le principal catalyseur de l'entrepreneuriat des jeunes et des femmes.</p>
          </article>
          <article className="card-apa p-8">
            <p className="eyebrow">Mission</p>
            <h2 className="mt-3 text-2xl font-bold">Notre mission</h2>
            <p className="mt-4 text-muted-foreground">Transformer le potentiel humain en expertise concrète. Nous fournissons un accompagnement pratique, académique et innovant pour bâtir une main-d'œuvre hautement compétitive et des entrepreneurs résilients.</p>
          </article>
        </div>
      </section>
      <section className="container-apa py-16 md:py-20">
        <SectionTitle eyebrow="Ce qui nous guide" title="Nos valeurs fondamentales" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="card-apa p-6">
              <span className="font-display text-sm font-semibold text-brand-orange">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
