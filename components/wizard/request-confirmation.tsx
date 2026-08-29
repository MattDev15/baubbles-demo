import { Phone, MessageCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { brand } from "@/data/brand";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function RequestConfirmation() {
  return (
    <div className="py-8 text-center">
      <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Richiesta ricevuta 🐾</h2>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        Grazie! Abbiamo ricevuto le informazioni.
      </p>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">
        Ti ricontatteremo appena possibile per capire insieme le esigenze del tuo animale e concordare l&apos;appuntamento.
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm font-medium text-forest-dark">
        Se preferisci parlarci subito, puoi comunque chiamarci o scriverci su WhatsApp.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={`tel:${brand.phoneTel}`} className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-cream hover:bg-forest-dark transition-colors">
          <Phone size={16} /> Chiama
        </a>
        <a href={buildWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-cream hover:bg-coral-dark transition-colors">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>

      <div className="mt-6">
        <LinkButton href="/" variant="ghost">Torna alla Home</LinkButton>
      </div>
    </div>
  );
}
