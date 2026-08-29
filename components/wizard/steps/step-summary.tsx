"use client";

import { useWizardStore } from "@/hooks/use-wizard-store";
import { serviceOptions, dayOptions } from "@/data/services";

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-line/70 py-2.5 text-sm last:border-none">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

export function StepSummary({ onBack, onSubmit, submitting }: { onBack: () => void; onSubmit: () => void; submitting: boolean }) {
  const { draft } = useWizardStore();

  const serviceLabels = draft.requestedServices
    .map((id) => serviceOptions.find((s) => s.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const dayLabels = draft.preferredDays.includes("flessibile")
    ? "Flessibile"
    : draft.preferredDays.map((id) => dayOptions.find((d) => d.id === id)?.label).filter(Boolean).join(", ");

  const contactLabel =
    draft.preferredContact === "PHONE" ? "Telefonata" : draft.preferredContact === "WHATSAPP" ? "WhatsApp" : draft.preferredContact === "ANY" ? "Nessuna preferenza" : undefined;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">La tua richiesta</h2>
      <p className="mt-1.5 text-sm text-ink-soft">Controlla i dettagli prima di inviare.</p>

      <div className="mt-6 rounded-2xl border border-line bg-white/60 p-5">
        <Row label="Animale" value={draft.petName} />
        <Row label="Taglia" value={draft.petSize} />
        <Row label="Servizi indicativi" value={serviceLabels || undefined} />
        <Row label="Note" value={draft.customerNotes} />
        <Row label="Foto" value={draft.photos.length ? `${draft.photos.length} allegate` : undefined} />
        <Row label="Giorni preferiti" value={dayLabels || undefined} />
        <Row label="Metodo di ricontatto" value={contactLabel} />
        <Row label="Numero" value={draft.phone} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="rounded-full px-5 py-3 text-sm font-medium text-ink-soft hover:bg-cream-soft">Indietro</button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:opacity-50"
        >
          {submitting ? "Invio in corso..." : "Invia richiesta"}
        </button>
      </div>
    </div>
  );
}
