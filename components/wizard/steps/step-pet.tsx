"use client";

import { useWizardStore } from "@/hooks/use-wizard-store";
import { OptionPill, WizardNav } from "@/components/wizard/wizard-controls";
import { PetSize, PetType } from "@/types/request";

const typeOptions: { id: PetType; label: string }[] = [
  { id: "DOG", label: "Cane" },
  { id: "CAT", label: "Gatto" },
  { id: "OTHER", label: "Altro" },
];

const sizeOptions: { id: PetSize; label: string }[] = [
  { id: "SMALL", label: "Piccola" },
  { id: "MEDIUM", label: "Media" },
  { id: "LARGE", label: "Grande" },
  { id: "XL", label: "Molto grande" },
];

export function StepPet({ onNext }: { onNext: () => void }) {
  const { draft, setDraft } = useWizardStore();
  const canProceed = !!draft.petName?.trim() && !!draft.petType;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Il tuo animale</h2>

      <div className="mt-6">
        <label htmlFor="petName" className="text-sm font-medium text-ink">Nome</label>
        <input
          id="petName"
          value={draft.petName ?? ""}
          onChange={(e) => setDraft({ petName: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 outline-none focus:border-forest"
          placeholder="Es. Luna"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-ink">Tipo</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {typeOptions.map((o) => (
            <OptionPill key={o.id} label={o.label} selected={draft.petType === o.id} onClick={() => setDraft({ petType: o.id })} />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="petBreed" className="text-sm font-medium text-ink">Razza <span className="font-normal text-ink-soft">(facoltativa)</span></label>
        <input
          id="petBreed"
          value={draft.petBreed ?? ""}
          onChange={(e) => setDraft({ petBreed: e.target.value })}
          className="mt-1.5 w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 outline-none focus:border-forest"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-ink">Taglia indicativa</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizeOptions.map((o) => (
            <OptionPill key={o.id} label={o.label} selected={draft.petSize === o.id} onClick={() => setDraft({ petSize: o.id })} />
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          Non preoccuparti se non sai indicare tutto con precisione: valuteremo noi.
        </p>
      </div>

      <WizardNav onNext={onNext} nextDisabled={!canProceed} hideBack />
    </div>
  );
}
