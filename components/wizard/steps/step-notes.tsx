"use client";

import { useRef } from "react";
import { useWizardStore } from "@/hooks/use-wizard-store";
import { WizardNav } from "@/components/wizard/wizard-controls";
import { ImagePlus, X } from "lucide-react";

const MAX_PHOTOS = 3;

export function StepNotes({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { draft, setDraft } = useWizardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const remaining = MAX_PHOTOS - draft.photos.length;
    const toAdd = Array.from(files).slice(0, remaining);
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setDraft({ photos: [...draft.photos, reader.result] });
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(index: number) {
    setDraft({ photos: draft.photos.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Raccontaci qualcosa in più</h2>

      <div className="mt-6">
        <label htmlFor="customerNotes" className="text-sm font-medium text-ink">
          C&apos;è qualcosa che dovremmo sapere?
        </label>
        <textarea
          id="customerNotes"
          value={draft.customerNotes ?? ""}
          onChange={(e) => setDraft({ customerNotes: e.target.value })}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-line bg-white/70 px-4 py-3 outline-none focus:border-forest"
          placeholder="Pelo molto annodato, prima esperienza in toelettatura, cane anziano, timoroso, particolarmente vivace, problemi durante il bagno..."
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-ink">Foto (facoltative)</p>
        <p className="mt-1 text-sm text-ink-soft">
          Se vuoi, una foto può aiutarci a capire meglio la situazione prima di sentirci.
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          {draft.photos.map((photo, i) => (
            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element -- data URL locale, next/image non applicabile in demo */}
              <img src={photo} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute right-1 top-1 rounded-full bg-ink/70 p-0.5 text-cream"
                aria-label="Rimuovi foto"
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {draft.photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line text-ink-soft hover:border-forest/50"
            >
              <ImagePlus size={20} />
              <span className="text-[11px]">Aggiungi</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <WizardNav onNext={onNext} onBack={onBack} />
    </div>
  );
}
