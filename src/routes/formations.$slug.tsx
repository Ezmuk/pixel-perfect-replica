import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categoryTitle, getFormation } from "@/lib/formations";
import { pageMeta } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/formations/$slug")({
  loader: ({ params }) => {
    const f = getFormation(params.slug);
    if (!f) throw notFound();
    return f;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(`${loaderData.title} — Formation à Goma | APA`, `${loaderData.summary} Formation proposée par l'Académie Professionnelle d'Afrique à Goma, RDC.`, `/formations/${loaderData.slug}`)
      : { meta: [{ title: "Formation introuvable | APA" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="container-apa py-24 text-center">
      <h1 className="text-3xl font-bold">Formation introuvable</h1>
      <Link to="/formations" className="btn btn-blue mt-6">Voir toutes les formations</Link>
    </div>
  ),
  component: FormationPage,
});

const TBC = "Information à confirmer";
const status = { ouvert: "Inscriptions ouvertes", ferme: "Inscriptions fermées", "a-confirmer": "Calendrier à confirmer" };

function FormationPage() {
  const f = Route.useLoaderData();
  const rows = [
    ["Durée", f.duration], ["Frais", f.fees], ["Horaires", f.schedule], ["Prérequis", f.prerequisites], ["Modalité", f.mode],
  ] as const;
  return (
    <>
      <PageHeader crumbs={[{ label: "Formations", to: "/formations" }, { label: f.title }]} title={f.title} intro={f.summary} />
      <div className="container-apa grid gap-10 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="eyebrow">{categoryTitle(f.category)}</p>
          <h2 className="mt-3 text-2xl font-bold">Présentation</h2>
          <p className="mt-4 text-lg leading-relaxed">{f.description}</p>
        </div>
        <aside className="card-apa h-fit p-6">
          <p className="inline-block rounded-full bg-warning px-3 py-1 text-xs font-semibold text-warning-foreground">{status[f.enrollment]}</p>
          <dl className="mt-5 divide-y">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className={v ? "font-medium" : "italic text-muted-foreground"}>{v ?? TBC}</dd>
              </div>
            ))}
          </dl>
          <Link to="/inscription" search={{ formation: f.slug }} className="btn btn-orange mt-6 w-full">Demander une inscription</Link>
          <Link to="/contact" className="btn btn-outline mt-3 w-full">Poser une question</Link>
        </aside>
      </div>
    </>
  );
}
