import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SUPPORT_OPTIONS,
  accompagnementSchema,
  prepareAccompagnement,
  type AccompagnementValues,
  type PreparedRequest,
} from "@/lib/forms";
import { pageMeta } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { ConsentField, Field, RequestSuccess, fieldControlClass, textareaClass } from "@/components/site/RequestForm";

export const Route = createFileRoute("/accompagnement")({
  head: () =>
    pageMeta(
      "Demande d'appui — entrepreneuriat féminin | APA Goma",
      "Demandez un accompagnement en mentorat, leadership ou appui technique pour votre projet entrepreneurial.",
      "/accompagnement",
    ),
  component: AccompagnementPage,
});

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function AccompagnementPage() {
  const [request, setRequest] = useState<PreparedRequest | null>(null);
  const form = useForm<AccompagnementValues>({
    resolver: zodResolver(accompagnementSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      stage: "",
      supports: [],
      project: "",
      consent: false,
    },
  });
  const supports = form.watch("supports");

  if (request) {
    return (
      <>
        <PageHeader
          crumbs={[{ label: "Entrepreneuriat féminin", to: "/entrepreneuriat-feminin" }, { label: "Accompagnement" }]}
          title="Demande d'accompagnement"
        />
        <section className="container-apa max-w-2xl py-16">
          <RequestSuccess title="Votre demande d'appui est prête" request={request} onEdit={() => setRequest(null)} />
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Entrepreneuriat féminin", to: "/entrepreneuriat-feminin" }, { label: "Accompagnement" }]}
        title="Demander un accompagnement"
        intro="Ce formulaire s'adresse aux femmes entrepreneures et porteuses de projet. Décrivez votre initiative : l'APA vous recontacte."
      />
      <section className="container-apa max-w-2xl py-16">
        <form
          className="card-apa space-y-6 p-6 md:p-10"
          onSubmit={form.handleSubmit((values) => setRequest(prepareAccompagnement(values)))}
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
            <input id="city" className={fieldControlClass} {...form.register("city")} />
          </Field>
          <Field label="Stade de votre projet" htmlFor="stage" error={form.formState.errors.stage?.message}>
            <select id="stage" className={fieldControlClass} {...form.register("stage")}>
              <option value="">Choisir</option>
              <option value="Idée / en conception">Idée / en conception</option>
              <option value="Activité déjà lancée">Activité déjà lancée</option>
              <option value="À formaliser / structurer">À formaliser / structurer</option>
              <option value="En croissance">En croissance</option>
            </select>
          </Field>
          <fieldset>
            <legend className="text-sm font-medium">Appui souhaité</legend>
            <ul className="mt-3 space-y-2">
              {SUPPORT_OPTIONS.map((s) => (
                <li key={s}>
                  <label className="flex gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4 shrink-0 accent-primary"
                      checked={supports.includes(s)}
                      onChange={() => form.setValue("supports", toggle(supports, s), { shouldValidate: true })}
                    />
                    {s}
                  </label>
                </li>
              ))}
            </ul>
            {form.formState.errors.supports && (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {form.formState.errors.supports.message}
              </p>
            )}
          </fieldset>
          <Field label="Présentation de votre projet" htmlFor="project" error={form.formState.errors.project?.message}>
            <textarea id="project" className={textareaClass} {...form.register("project")} />
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
