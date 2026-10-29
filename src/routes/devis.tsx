import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SERVICE_OPTIONS, devisSchema, prepareDevis, type DevisValues, type PreparedRequest } from "@/lib/forms";
import { pageMeta } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { ConsentField, Field, RequestSuccess, fieldControlClass, textareaClass } from "@/components/site/RequestForm";

export const Route = createFileRoute("/devis")({
  head: () =>
    pageMeta(
      "Demander un devis — appui-conseil | APA Goma",
      "Demandez une proposition d'accompagnement : suivi-évaluation, santé publique, communication ou analyse de données.",
      "/devis",
    ),
  component: DevisPage,
});

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function DevisPage() {
  const [request, setRequest] = useState<PreparedRequest | null>(null);
  const form = useForm<DevisValues>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      name: "",
      organization: "",
      role: "",
      email: "",
      phone: "",
      orgType: "",
      services: [],
      need: "",
      timeline: "",
      consent: false,
    },
  });
  const services = form.watch("services");

  if (request) {
    return (
      <>
        <PageHeader crumbs={[{ label: "Services", to: "/services" }, { label: "Devis" }]} title="Demande de devis" />
        <section className="container-apa max-w-2xl py-16">
          <RequestSuccess title="Votre demande de devis est prête" request={request} onEdit={() => setRequest(null)} />
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services", to: "/services" }, { label: "Devis" }]}
        title="Demander un devis"
        intro="Décrivez votre organisation et votre besoin. Nous vous proposerons un accompagnement adapté."
      />
      <section className="container-apa max-w-2xl py-16">
        <form
          className="card-apa space-y-6 p-6 md:p-10"
          onSubmit={form.handleSubmit((values) => setRequest(prepareDevis(values)))}
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Nom du contact" htmlFor="name" error={form.formState.errors.name?.message}>
              <input id="name" autoComplete="name" className={fieldControlClass} {...form.register("name")} />
            </Field>
            <Field label="Fonction (optionnel)" htmlFor="role">
              <input id="role" autoComplete="organization-title" className={fieldControlClass} {...form.register("role")} />
            </Field>
          </div>
          <Field label="Organisation" htmlFor="organization" error={form.formState.errors.organization?.message}>
            <input id="organization" autoComplete="organization" className={fieldControlClass} {...form.register("organization")} />
          </Field>
          <Field label="Type d'organisation" htmlFor="orgType" error={form.formState.errors.orgType?.message}>
            <select id="orgType" className={fieldControlClass} {...form.register("orgType")}>
              <option value="">Choisir</option>
              <option value="ONG / association">ONG / association</option>
              <option value="Entreprise privée">Entreprise privée</option>
              <option value="Institution publique">Institution publique</option>
              <option value="Bailleur / agence">Bailleur / agence</option>
              <option value="Autre">Autre</option>
            </select>
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="E-mail" htmlFor="email" error={form.formState.errors.email?.message}>
              <input id="email" type="email" autoComplete="email" className={fieldControlClass} {...form.register("email")} />
            </Field>
            <Field label="Téléphone" htmlFor="phone" error={form.formState.errors.phone?.message}>
              <input id="phone" type="tel" autoComplete="tel" className={fieldControlClass} {...form.register("phone")} />
            </Field>
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Services concernés</legend>
            <ul className="mt-3 space-y-2">
              {SERVICE_OPTIONS.map((s) => (
                <li key={s}>
                  <label className="flex gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4 shrink-0 accent-primary"
                      checked={services.includes(s)}
                      onChange={() => form.setValue("services", toggle(services, s), { shouldValidate: true })}
                    />
                    {s}
                  </label>
                </li>
              ))}
            </ul>
            {form.formState.errors.services && (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {form.formState.errors.services.message}
              </p>
            )}
          </fieldset>
          <Field label="Délai souhaité (optionnel)" htmlFor="timeline">
            <input id="timeline" className={fieldControlClass} placeholder="Ex. : d'ici 3 mois" {...form.register("timeline")} />
          </Field>
          <Field label="Description du besoin" htmlFor="need" error={form.formState.errors.need?.message}>
            <textarea id="need" className={textareaClass} {...form.register("need")} />
          </Field>
          <ConsentField
            id="consent"
            checked={form.watch("consent")}
            onChange={(v) => form.setValue("consent", v, { shouldValidate: true })}
            error={form.formState.errors.consent?.message}
          />
          <button type="submit" className="btn btn-orange w-full sm:w-auto">
            Préparer ma demande
          </button>
        </form>
      </section>
    </>
  );
}
