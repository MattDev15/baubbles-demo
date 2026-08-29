import { Container } from "@/components/ui/container";
import { brand } from "@/data/brand";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream-soft">
      <Container className="py-10">
        <p className="font-display text-xl font-semibold text-forest-dark">{brand.name}</p>
        <p className="mt-1 text-sm text-ink-soft">{brand.tagline}</p>
        {brand.address && <p className="mt-3 text-sm text-ink-soft">{brand.address}</p>}
        <p className="mt-4 text-xs text-ink-soft">© {new Date().getFullYear()} {brand.name}. Demo dimostrativa.</p>
      </Container>
    </footer>
  );
}
