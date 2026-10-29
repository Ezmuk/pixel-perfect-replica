import { createFileRoute } from "@tanstack/react-router";
import { pageMeta, SITE } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () =>
    pageMeta(
      "Politique de confidentialité | APA — Académie Professionnelle d'Afrique",
      "Comment l'Académie Professionnelle d'Afrique collecte, utilise et protège vos données personnelles.",
      "/politique-confidentialite",
    ),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Politique de confidentialité" }]} title="Politique de confidentialité" />
      <article className="container-apa max-w-3xl space-y-8 py-16 leading-relaxed">
        <section><h2 className="text-xl font-bold">Données collectées</h2><p className="mt-2">Lorsque vous nous contactez ou déposez une demande, nous recueillons uniquement les informations nécessaires : nom, e-mail, téléphone, formation ou service souhaité et votre message.</p></section>
        <section><h2 className="text-xl font-bold">Utilisation</h2><p className="mt-2">Ces données servent exclusivement à traiter votre demande et à vous recontacter. Elles ne sont ni vendues ni publiées.</p></section>
        <section><h2 className="text-xl font-bold">Accès et conservation</h2><p className="mt-2">Seule l'équipe habilitée de l'APA y a accès. Les données sont conservées le temps nécessaire au traitement de votre demande.</p></section>
        <section><h2 className="text-xl font-bold">Vos droits</h2><p className="mt-2">Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à <a className="font-medium text-primary" href={`mailto:${SITE.emails[0]}`}>{SITE.emails[0]}</a>.</p></section>
      </article>
    </>
  );
}
