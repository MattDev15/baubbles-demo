import clsx from "clsx";

export function OptionCard({ label, description, selected, onClick }: { label: string; description?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "w-full rounded-2xl border p-4 text-left transition-colors",
        selected ? "border-forest bg-forest/10 ring-1 ring-forest" : "border-line bg-white/60 hover:border-forest/40"
      )}
    >
      <p className={clsx("font-medium", selected ? "text-forest-dark" : "text-ink")}>{label}</p>
      {description && <p className="mt-0.5 text-sm text-ink-soft">{description}</p>}
    </button>
  );
}

export function OptionPill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        selected ? "border-forest bg-forest text-cream" : "border-line bg-white/60 text-ink hover:border-forest/40"
      )}
    >
      {label}
    </button>
  );
}

export function WizardNav({ onBack, onNext, nextLabel = "Continua", nextDisabled, hideBack }: { onBack?: () => void; onNext: () => void; nextLabel?: string; nextDisabled?: boolean; hideBack?: boolean }) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {!hideBack ? (
        <button type="button" onClick={onBack} className="rounded-full px-5 py-3 text-sm font-medium text-ink-soft hover:bg-cream-soft">
          Indietro
        </button>
      ) : <span />}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="rounded-full bg-forest px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:opacity-40 disabled:pointer-events-none"
      >
        {nextLabel}
      </button>
    </div>
  );
}

export function WizardProgress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-medium text-ink-soft">
        <span>Passo {step} di {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-soft">
        <div className="h-full rounded-full bg-forest transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
