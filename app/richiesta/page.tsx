import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RequestWizard } from "@/components/wizard/request-wizard";

export const metadata: Metadata = {
  title: "Lascia una richiesta — Baubbles",
  description: "Lasciaci le informazioni sul tuo animale, ti ricontatteremo appena possibile.",
};

export default function RichiestaPage() {
  return (
    <Container className="max-w-2xl py-10 md:py-16">
      <RequestWizard />
    </Container>
  );
}
