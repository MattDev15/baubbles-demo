"use client";

import { useWizardStore } from "@/hooks/use-wizard-store";
import { WizardNav } from "@/components/wizard/wizard-controls";
import { dayOptions } from "@/data/services";
import clsx from "clsx";

export function StepDays({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { draft, setDraft } = useWizardStore();
  const isFlexible = draft.preferredDays.includes("flessibile");

  function toggleDay(id: string) {
    const days = draft.preferredDays.includes(id)
      ? draft.preferredDays.filter((d) => d !== id)
      : [...draft.preferredDays.filter((d) => d !== "flessibile"), id];
    setDraft({ preferredDays: days });
  }

  function setFlexible() {
    setDraft({ preferredDays: isFlexible ? [] : ["flessibile"] });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Hai dei giorni che preferisci?</h2>
      <p className="mt-1.5 text-sm text-ink-soft">Facoltativo — è solo un&apos;indicazione, non una prenotazione.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {dayOptions.map((d) => {
          const selected = draft.preferredDays.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              disabled={isFlexible}
              onClick={() => toggleDay(d.id)}
              aria-pressed={selected}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isFlexible && "opacity-40",
                selected ? "border-forest bg-forest text-cream" : "border-line bg-white/60 text-ink hover:border-forest/40"
              )}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={setFlexible}
        aria-pressed={isFlexible}
        className={clsx(
          "mt-4 w-full rounded-2xl border p-4 text-left transition-colors",
          isFlexible ? "border-forest bg-forest/10 ring-1 ring-forest" : "border-line bg-white/60 hover:border-forest/40"
        )}
      >
        <span className={clsx("font-medium", isFlexible ? "text-forest-dark" : "text-ink")}>Sono flessibile</span>
      </button>

      <div className="mt-5 rounded-xl bg-cream-soft p-4 text-sm text-ink-soft">
        Questa non è ancora una prenotazione. Verificheremo insieme disponibilità e tempo necessario.
      </div>

      <WizardNav onNext={onNext} onBack={onBack} nextLabel="Vai al riepilogo" />
    </div>
  );
}
