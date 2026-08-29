"use client";

import { useWizardStore } from "@/hooks/use-wizard-store";
import { WizardNav } from "@/components/wizard/wizard-controls";
import { serviceOptions } from "@/data/services";
import clsx from "clsx";
import { Check } from "lucide-react";

export function StepServices({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { draft, setDraft } = useWizardStore();

  function toggle(id: string) {
    const selected = draft.requestedServices.includes(id)
      ? draft.requestedServices.filter((s) => s !== id)
      : [...draft.requestedServices, id];
    setDraft({ requestedServices: selected });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Di cosa hai bisogno?</h2>
      <p className="mt-1.5 text-sm text-ink-soft">Puoi selezionare più opzioni.</p>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {serviceOptions.map((s) => {
          const selected = draft.requestedServices.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              aria-pressed={selected}
              className={clsx(
                "flex items-center justify-between rounded-2xl border p-4 text-left transition-colors",
                selected ? "border-forest bg-forest/10 ring-1 ring-forest" : "border-line bg-white/60 hover:border-forest/40"
              )}
            >
              <span className={clsx("font-medium", selected ? "text-forest-dark" : "text-ink")}>{s.label}</span>
              {selected && <Check size={18} className="text-forest-dark" />}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        Ogni animale è diverso. Il servizio e il tempo necessario verranno valutati insieme prima dell&apos;appuntamento.
      </p>

      <WizardNav onNext={onNext} onBack={onBack} />
    </div>
  );
}
