import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, GraduationCap, Languages, Database, Wrench, Rocket, Check } from "lucide-react";
import hero from "@/assets/apa-home-hero.jpg";
import femmes from "@/assets/femmes-entrepreneures.jpg";
import { CATEGORIES } from "@/lib/formations";
import { pageMeta, SITE } from "@/lib/site";
import { SectionTitle } from "@/components/site/Layout";
import { BlogCard } from "@/components/blog/BlogCard";
import { posts } from "@/lib/blog";
import { VALUES } from "./a-propos";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "APA Goma — Formation professionnelle et appui-conseil en RDC",
      "L'Académie Professionnelle d'Afrique forme les jeunes, les femmes et les professionnels à Goma et accompagne ONG, entreprises et institutions.",
      "/",
    ),
  component: Index,
});

const catIcons = { langues: Languages, data: Database, metiers: Wrench, entrepreneuriat: Rocket } as const;
const recentPosts = [...posts]
  .filter((post) => post.status !== "draft")
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Un formateur accompagne des apprenants pendant une séance de travail sur ordinateur" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-apa py-24 md:py-36">
          <div className="fade-up max-w-2xl">
            <p className="eyebrow text-brand-orange">Académie Professionnelle d'Afrique · Goma, RDC</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">Transformez votre potentiel en expertise concrète.</h1>
            <p className="mt-6 text-lg text-primary-foreground/85 md:text-xl">Formation professionnelle, insertion et appui-conseil au cœur de la région des Grands Lacs, depuis 2015.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/formations" className="btn btn-orange">Découvrir les formations <ArrowRight className="size-4" /></Link>
              <Link to="/services" className="btn btn-ghost-light">Solutions pour les organisations</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-apa py-20">
        <SectionTitle eyebrow="Nos domaines d'expertise" title="Deux pôles d'excellence">Une offre structurée pour les apprenants comme pour les organisations.</SectionTitle>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { icon: GraduationCap, tag: "B2C", title: "Formation professionnelle & insertion", text: "Programmes pratiques pour les professionnels, les chercheurs d'emploi et les jeunes.", to: "/formations" as const, cta: "Voir les formations" },
            { icon: Building2, tag: "B2B", title: "Solutions institutionnelles & conseil", text: "Accompagnement sur-mesure pour les ONG, les entreprises privées et les institutions de l'État.", to: "/services" as const, cta: "Voir les services" },
          ].map((p) => (
            <article key={p.tag} className="card-apa flex flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-lg bg-secondary text-primary"><p.icon className="size-6" /></span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{p.tag}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{p.text}</p>
              <Link to={p.to} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">{p.cta} <ArrowRight className="size-4" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-apa">
          <SectionTitle eyebrow="Catalogue" title="Nos catégories de formation" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => {
              const Icon = catIcons[c.id];
              return (
                <Link key={c.id} to="/formations" hash={c.id} className="card-apa group p-6 transition-colors hover:border-primary">
                  <Icon className="size-7 text-brand-orange" />
                  <h3 className="mt-4 text-lg font-semibold group-hover:text-primary">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-apa py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Le journal APA" title="Nos articles récents">
            Des conseils et des idées pour apprendre, entreprendre et faire avancer votre parcours.
          </SectionTitle>
          <Link to="/blog" className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">
            Tous les articles <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="container-apa grid items-center gap-12 py-20 md:grid-cols-2">
        <img src={femmes} alt="Entrepreneure congolaise dans son atelier de couture à Goma" width={1200} height={1200} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
        <div>
          <SectionTitle eyebrow="Notre priorité" title="L'autonomisation au féminin">Parce que l'avenir économique de notre région passe par le leadership féminin.</SectionTitle>
          <ul className="mt-6 space-y-3">
            {["Des programmes de mentorat sur-mesure", "Des formations intensives en leadership", "Un appui technique pour structurer, formaliser et pérenniser vos projets"].map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-brand-orange" /><span>{t}</span></li>
            ))}
          </ul>
          <Link to="/entrepreneuriat-feminin" className="btn btn-blue mt-8">Découvrir le programme</Link>
        </div>
      </section>

      <section className="bg-primary-deep py-20">
        <div className="container-apa grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow text-brand-orange">Notre mission</p>
            <h2 className="mt-3 text-2xl font-bold text-primary-foreground md:text-4xl">Transformer le potentiel humain en expertise concrète.</h2>
            <p className="mt-5 text-primary-foreground/75">Nous fournissons un accompagnement pratique, académique et innovant pour bâtir une main-d'œuvre hautement compétitive et des entrepreneurs résilients.</p>
            <Link to="/a-propos" className="btn btn-ghost-light mt-8">En savoir plus sur l'APA</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border border-primary-foreground/15 p-6">
                <h3 className="text-lg font-semibold text-brand-orange">{v.title}</h3>
                <p className="mt-2 text-primary-foreground/75">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-apa py-20">
        <div className="card-apa grid gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
          <div>
            <SectionTitle eyebrow="Contact" title="Parlons de votre projet">Une formation, un accompagnement ou une offre pour votre organisation : notre équipe vous répond.</SectionTitle>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-orange">Nous contacter</Link>
              <Link to="/devis" className="btn btn-outline">Demander un devis</Link>
            </div>
          </div>
          <dl className="space-y-4 self-center">
            <div><dt className="text-sm text-muted-foreground">Téléphone</dt>{SITE.phones.map((p) => <dd key={p.tel}><a className="font-semibold text-primary" href={`tel:${p.tel}`}>{p.display}</a></dd>)}</div>
            <div><dt className="text-sm text-muted-foreground">E-mail</dt>{SITE.emails.map((e) => <dd key={e}><a className="font-semibold text-primary" href={`mailto:${e}`}>{e}</a></dd>)}</div>
          </dl>
        </div>
      </section>
    </>
  );
}
