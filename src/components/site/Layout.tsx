import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, MessageCircle, ChevronRight } from "lucide-react";
import logo from "@/assets/apa-logo.png.asset.json";
import { NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-apa flex h-18 items-center justify-between gap-6 py-3">
        <Link to="/" aria-label="APA — Accueil" className="shrink-0">
          <img src={logo.url} alt="Logo APA — Académie Professionnelle d'Afrique" width={891} height={493} className="h-12 w-auto" />
        </Link>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.slice(1).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary" }}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/formations" className="btn btn-orange hidden lg:inline-flex">S'inscrire</Link>
        <button type="button" className="rounded-md p-2 lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Navigation mobile" className="border-t lg:hidden">
          <ul className="container-apa flex flex-col py-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block rounded-md px-2 py-3 font-medium hover:bg-secondary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-2"><Link to="/formations" onClick={() => setOpen(false)} className="btn btn-orange w-full">S'inscrire à une formation</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-apa grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block rounded-lg bg-background p-3"><img src={logo.url} alt="Logo APA" width={891} height={493} loading="lazy" className="h-14 w-auto" /></div>
          <p className="mt-4 max-w-sm text-primary-foreground/75">Transformer le potentiel humain en expertise concrète — formation professionnelle et appui-conseil à Goma, RDC, depuis 2015.</p>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">Plan du site</h2>
          <ul className="mt-4 space-y-2 text-primary-foreground/80">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary-foreground">{n.label}</Link></li>)}
            <li><Link to="/politique-confidentialite" className="hover:text-primary-foreground">Politique de confidentialité</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">Contact</h2>
          <ul className="mt-4 space-y-3 text-primary-foreground/80">
            {SITE.phones.map((p) => <li key={p.tel} className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0" /><a href={`tel:${p.tel}`} className="hover:text-primary-foreground">{p.display}</a></li>)}
            {SITE.emails.map((e) => <li key={e} className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0" /><a href={`mailto:${e}`} className="hover:text-primary-foreground">{e}</a></li>)}
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /><span>Goma, République Démocratique du Congo</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="container-apa py-5 text-sm text-primary-foreground/60">© {new Date().getFullYear()} Académie Professionnelle d'Afrique — Fondation Africa Telema.</p>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Nous écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-success text-primary-foreground shadow-lg transition-transform hover:scale-105">
      <MessageCircle className="size-7" />
    </a>
  );
}

export function PageHeader({ title, intro, crumbs }: { title: string; intro?: string; crumbs: { label: string; to?: string }[] }) {
  return (
    <section className="border-b bg-secondary">
      <div className="container-apa py-12 md:py-16">
        <nav aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="size-3.5" aria-hidden />
                {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span aria-current="page" className="text-foreground">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl text-3xl font-bold md:text-5xl">{title}</h1>
        <span className="rule-orange mt-5" />
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-2xl font-bold md:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted-foreground">{children}</p>}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="bg-primary">
      <div className="container-apa flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">Prêt à propulser votre carrière ou votre organisation ?</h2>
          <p className="mt-2 text-primary-foreground/80">Contactez l'équipe APA à Goma pour en savoir plus.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn btn-orange">Nous contacter</Link>
          <a href={`tel:${SITE.phones[0].tel}`} className="btn btn-ghost-light"><Phone className="size-4" />{SITE.phones[0].display}</a>
        </div>
      </div>
    </section>
  );
}
