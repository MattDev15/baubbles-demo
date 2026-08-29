import { Phone, MessageCircle, PawPrint } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PetPlaceholder } from "@/components/ui/pet-placeholder";
import { brand } from "@/data/brand";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral-dark">
              {brand.name}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              {brand.tagline}
            </h1>
            <p className="mt-5 max-w-md text-base text-ink-soft md:text-lg">
              Siamo impegnati con un pelosetto e non riusciamo a rispondere
              subito? Nessun problema: scegli il modo che preferisci per
              raggiungerci.
            </p>
          </div>
          <PetPlaceholder seed="hero" className="aspect-[4/3] rounded-3xl shadow-sm" />
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-3">
            <a
              href={`tel:${brand.phoneTel}`}
              className="flex flex-col items-start gap-3 rounded-3xl border border-line bg-white/60 p-6 transition-colors hover:border-forest/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/10">
                <Phone size={20} className="text-forest-dark" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-ink">Chiamaci</p>
                <p className="mt-1 text-sm text-ink-soft">Per chi preferisce parlare direttamente.</p>
              </div>
            </a>

            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start gap-3 rounded-3xl border border-line bg-white/60 p-6 transition-colors hover:border-forest/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/10">
                <MessageCircle size={20} className="text-coral-dark" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-ink">Scrivici su WhatsApp</p>
                <p className="mt-1 text-sm text-ink-soft">Per chi preferisce il sistema attuale.</p>
              </div>
            </a>

            <a
              href="/richiesta"
              className="flex flex-col items-start gap-3 rounded-3xl border border-forest bg-forest p-6 text-cream transition-colors hover:bg-forest-dark"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/15">
                <PawPrint size={20} className="text-cream" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">Lascia una richiesta</p>
                <p className="mt-1 text-sm text-cream/80">Lasciaci le informazioni principali. Ti ricontatteremo appena possibile.</p>
              </div>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
