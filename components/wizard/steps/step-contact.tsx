"use client";

import { useWizardStore } from "@/hooks/use-wizard-store";
import { OptionCard, OptionPill, WizardNav } from "@/components/wizard/wizard-controls";
import { PreferredContact, PreferredTimeOfDay } from "@/types/request";

const contactOptions: { id: PreferredContact; label: string; description: string }[] = [
  { id: "PHONE", label: "📞 Telefonata", description: "Preferisco parlarne direttamente al telefono." },
  { id: "WHATSAPP", label: "💬 WhatsApp", description: "Preferisco ricevere un messaggio su WhatsApp." },
  { id: "ANY", label: "Nessuna preferenza", description: "Va bene in entrambi i modi." },
];

const timeOptions: { id: PreferredTimeOfDay; label: string }[] = [
  { id: "MORNING", label: "Mattina" },
  { id: "AFTERNOON", label: "Pomeriggio" },
  { id: "ANY", label: "Indifferente" },
];

export function StepContact({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { draft, setDraft } = useWizardStore();
  const canProceed = !!draft.customerName?.trim() && !!draft.phone?.trim() && !!draft.preferredContact;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Come preferisci essere ricontattato?</h2>

      <div className="mt-6 grid gap-3">
        {contactOptions.map((o) => (
          <OptionCard key={o.id} label={o.label} description={o.description} selected={draft.preferredContact === o.id} onClick={() => setDraft({ preferredContact: o.id })} />
        ))}
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-ink">Quando preferisci essere ricontattato?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {timeOptions.map((o) => (
            <OptionPill key={o.id} label={o.label} selected={draft.preferredTimeOfDay === o.id} onClick={() => setDraft({ preferredTimeOfDay: o.id })} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="customerName" className="text-sm font-medium text-ink">Il tuo nome</label>
          <input
            id="customerName"
            value={draft.customerName ?? ""}
            onChange={(e) => setDraft({ customerName: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 outline-none focus:border-forest"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">Telefono</label>
          <input
            id="phone"
            type="tel"
            value={draft.phone ?? ""}
            onChange={(e) => setDraft({ phone: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 outline-none focus:border-forest"
          />
        </div>
      </div>

      <WizardNav onNext={onNext} onBack={onBack} nextDisabled={!canProceed} />
    </div>
  );
}
