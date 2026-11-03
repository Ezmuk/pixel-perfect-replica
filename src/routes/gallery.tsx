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
      "Galerie photo | Fondation Africa Telema",
      "Découvrez en images les activités et la vie de la Fondation Africa Telema à Goma.",
      "/gallery",
    ),
  component: Gallery,
});

function Gallery() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Galerie" }]}
        title="La vie à la Fondation en images"
        intro="Découvrez les moments qui font vivre la Fondation Africa Telema."
      />
      <section className="container-apa py-12 md:py-16" aria-label="Photos de la Fondation">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map(([path, src], index) => (
            <figure key={path} className="group overflow-hidden rounded-xl bg-secondary">
              <img
                src={src}
                alt={`Photo ${index + 1} de la Fondation Africa Telema`}
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
