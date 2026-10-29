import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import type { PreparedRequest } from "@/lib/forms";
import { mailtoHref, whatsappHref } from "@/lib/forms";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export const fieldControlClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 text-base shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export const textareaClass = `${fieldControlClass} h-auto min-h-32 py-3`;

export function ConsentField({
  id,
  checked,
  onChange,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex gap-3 text-sm leading-relaxed">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 size-4 shrink-0 accent-primary"
        />
        <span>
          J'accepte que l'APA utilise ces informations pour traiter ma demande, conformément à la{" "}
          <Link to="/politique-confidentialite" className="font-medium text-primary underline-offset-2 hover:underline">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function RequestSuccess({
  title,
  request,
  onEdit,
}: {
  title: string;
  request: PreparedRequest;
  onEdit: () => void;
}) {
  return (
    <div className="card-apa p-8 text-center">
      <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden />
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-muted-foreground">
        Envoyez maintenant votre demande par e-mail ou WhatsApp. L'équipe APA vous répondra.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href={mailtoHref(request)} className="btn btn-orange">
          <Mail className="size-4" /> Ouvrir l'e-mail
        </a>
        <a href={whatsappHref(request)} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
          <MessageCircle className="size-4" /> Envoyer via WhatsApp
        </a>
      </div>
      <button type="button" onClick={onEdit} className="mt-6 text-sm font-medium text-primary hover:underline">
        Modifier ma demande
      </button>
    </div>
  );
}
