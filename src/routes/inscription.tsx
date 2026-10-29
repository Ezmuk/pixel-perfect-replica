import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORMATIONS } from "@/lib/formations";
import { inscriptionSchema, prepareInscription, type InscriptionValues, type PreparedRequest } from "@/lib/forms";
import { pageMeta } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { ConsentField, Field, RequestSuccess, fieldControlClass, textareaClass } from "@/components/site/RequestForm";

export const Route = createFileRoute("/inscription")({
  validateSearch: (search: Record<string, unknown>) => ({
    formation: typeof search.formation === "string" ? search.formation : undefined,
  }),
  head: () =>
    pageMeta(
      "Candidature à une formation | APA Goma",
      "Déposez votre demande d'inscription à une formation professionnelle de l'Académie Professionnelle d'Afrique à Goma.",
      "/inscription",
    ),
  component: InscriptionPage,
});

function InscriptionPage() {
  const { formation: preselected } = Route.useSearch();
  const [request, setRequest] = useState<PreparedRequest | null>(null);
  const form = useForm<InscriptionValues>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      formation: preselected && FORMATIONS.some((f) => f.slug === preselected) ? preselected : "",
      situation: "",
      message: "",
      consent: false,
    },
  });

  if (request) {
    return (
      <>
        <PageHeader crumbs={[{ label: "Candidature" }]} title="Candidature à une formation" />
        <section className="container-apa max-w-2xl py-16">
          <RequestSuccess title="Votre candidature est prête" request={request} onEdit={() => setRequest(null)} />
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Formations", to: "/formations" }, { label: "Candidature" }]}
        title="Candidature à une formation"
        intro="Remplissez ce formulaire. Vous l'enverrez ensuite par e-mail ou WhatsApp à l'équipe APA."
      />
      <section className="container-apa max-w-2xl py-16">
        <form
          className="card-apa space-y-6 p-6 md:p-10"
          onSubmit={form.handleSubmit((values) => setRequest(prepareInscription(values)))}
          noValidate
        >
          <Field label="Nom complet" htmlFor="name" error={form.formState.errors.name?.message}>
            <input id="name" autoComplete="name" className={fieldControlClass} {...form.register("name")} />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="E-mail" htmlFor="email" error={form.formState.errors.email?.message}>
              <input id="email" type="email" autoComplete="email" className={fieldControlClass} {...form.register("email")} />
            </Field>
            <Field label="Téléphone" htmlFor="phone" error={form.formState.errors.phone?.message}>
              <input id="phone" type="tel" autoComplete="tel" className={fieldControlClass} {...form.register("phone")} />
            </Field>
          </div>
          <Field label="Ville / quartier" htmlFor="city" error={form.formState.errors.city?.message}>
            <input id="city" autoComplete="address-level2" className={fieldControlClass} {...form.register("city")} />
          </Field>
          <Field label="Formation souhaitée" htmlFor="formation" error={form.formState.errors.formation?.message}>
            <select id="formation" className={fieldControlClass} {...form.register("formation")}>
              <option value="">Choisir une formation</option>
              {FORMATIONS.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Situation actuelle (optionnel)" htmlFor="situation" error={form.formState.errors.situation?.message}>
            <select id="situation" className={fieldControlClass} {...form.register("situation")}>
              <option value="">Préciser si vous le souhaitez</option>
              <option value="Étudiant·e">Étudiant·e</option>
              <option value="Chercheur·euse d'emploi">Chercheur·euse d'emploi</option>
              <option value="Professionnel·le en activité">Professionnel·le en activité</option>
              <option value="Entrepreneur·e">Entrepreneur·e</option>
            </select>
          </Field>
          <Field label="Message (optionnel)" htmlFor="message" hint="Disponibilités, questions ou motivation.">
            <textarea id="message" className={textareaClass} {...form.register("message")} />
          </Field>
          <ConsentField
            id="consent"
            checked={form.watch("consent")}
            onChange={(v) => form.setValue("consent", v, { shouldValidate: true })}
            error={form.formState.errors.consent?.message}
          />
          <button type="submit" className="btn btn-orange w-full sm:w-auto">
            Préparer ma candidature
          </button>
        </form>
      </section>
    </>
  );
}
