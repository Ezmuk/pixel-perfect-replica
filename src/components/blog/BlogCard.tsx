import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { categoryName, formatDate, type BlogPost } from "@/lib/blog";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return <article className={featured ? "group grid overflow-hidden rounded-2xl bg-primary-deep text-primary-foreground md:grid-cols-[1.05fr_0.95fr]" : "group overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-xl"}>
    <Link to="/blog/$slug" params={{ slug: post.slug }} className={featured ? "order-2 md:order-1" : "block"}>
      <img src={post.cover} alt={post.alt} className={featured ? "h-full min-h-64 w-full object-cover" : "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"} />
    </Link>
    <div className={featured ? "order-1 flex flex-col justify-center p-7 md:order-2 md:p-10" : "p-6"}>
      <p className={featured ? "text-sm font-semibold uppercase tracking-widest text-brand-orange" : "text-sm font-semibold uppercase tracking-widest text-accent-foreground"}>{categoryName(post.category)}</p>
      <h2 className={featured ? "mt-4 text-2xl font-bold text-primary-foreground md:text-4xl" : "mt-3 text-xl font-bold"}><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></h2>
      <p className={featured ? "mt-4 text-lg leading-relaxed text-primary-foreground/75" : "mt-3 leading-relaxed text-muted-foreground"}>{post.excerpt}</p>
      <div className={featured ? "mt-7 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/65" : "mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"}><span>{formatDate(post.date)}</span><span className="flex items-center gap-1"><Clock3 className="size-4" />{post.readTime} min de lecture</span><Link to="/blog/$slug" params={{ slug: post.slug }} className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-orange">Lire l'article <ArrowUpRight className="size-4" /></Link></div>
    </div>
  </article>;
}
