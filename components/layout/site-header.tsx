import Link from "next/link";
import { Container } from "@/components/ui/container";
import { brand } from "@/data/brand";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-forest-dark md:text-2xl">
          {brand.name}
        </Link>
        <Link href="/admin" className="text-xs font-medium text-ink-soft hover:text-forest-dark">
          Area gestione
        </Link>
      </Container>
    </header>
  );
}
