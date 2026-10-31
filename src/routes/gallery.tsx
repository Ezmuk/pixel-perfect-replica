import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { pageMeta } from "@/lib/site";

const photos = Object.entries(
  import.meta.glob<string>("../assets/APA photos/*.{jpg,jpeg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
).sort(([first], [second]) => first.localeCompare(second));

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageMeta(
      "Galerie photo | Académie Professionnelle d'Afrique",
      "Découvrez en images les activités et la vie de l'Académie Professionnelle d'Afrique à Goma.",
      "/gallery",
    ),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Galerie" }]}
        title="La vie à l'APA en images"
        intro="Découvrez les moments qui font vivre l'Académie Professionnelle d'Afrique."
      />
      <section className="container-apa py-12 md:py-16" aria-label="Photos de l'APA">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map(([path, src], index) => (
            <figure key={path} className="group overflow-hidden rounded-xl bg-secondary">
              <img
                src={src}
                alt={`Photo ${index + 1} de l'Académie Professionnelle d'Afrique`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
