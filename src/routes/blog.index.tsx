import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { categories, posts } from "@/lib/blog";
import { pageMeta } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/blog/")({ head: () => pageMeta("Journal APA — Idées, compétences et parcours | APA", "Les réflexions de l'APA sur les compétences, l'entrepreneuriat et le leadership à Goma.", "/blog"), component: BlogIndex });

function BlogIndex() {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("all");
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const filtered = useMemo(() => posts.filter((post) => post.slug !== featured.slug && (category === "all" || post.category === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())), [category, query, featured.slug]);
  return <>
    <PageHeader crumbs={[{ label: "Journal APA" }]} title="Le journal APA" intro="Des idées et des expériences pour apprendre, entreprendre et transformer son environnement." />
    <div className="container-apa py-12 md:py-16">
      <BlogCard post={featured} featured />
      <div className="mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">À la une</p><h2 className="mt-2 text-3xl font-bold">Explorer nos articles</h2></div><div className="flex flex-col gap-3 sm:flex-row"><label className="relative"><span className="sr-only">Rechercher un article</span><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher" className="h-10 rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label><label className="relative"><span className="sr-only">Filtrer par catégorie</span><SlidersHorizontal className="absolute left-3 top-3 size-4 text-muted-foreground" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 appearance-none rounded-md border bg-background pl-9 pr-8 text-sm"><option value="all">Toutes les catégories</option>{categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label></div></div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      {!filtered.length && <div className="mt-8 rounded-2xl border border-dashed p-12 text-center"><p className="font-semibold">Aucun article trouvé</p><p className="mt-2 text-muted-foreground">Essayez une autre recherche ou catégorie.</p></div>}
      <div className="mt-16 rounded-2xl bg-secondary p-8 md:flex md:items-center md:justify-between"><div><p className="eyebrow">Aller plus loin</p><h2 className="mt-2 text-2xl font-bold">Développez vos compétences avec l'APA.</h2></div><Link to="/formations" className="btn btn-orange mt-5 md:mt-0">Voir les formations</Link></div>
    </div>
  </>;
}
