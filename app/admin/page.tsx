"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { useRequestsStore } from "@/hooks/use-requests-store";
import { TodaySummary } from "@/components/admin/today-summary";
import { RequestCard } from "@/components/admin/request-card";
import { RequestDetailPanel } from "@/components/admin/request-detail-panel";
import { ServiceRequest } from "@/types/request";

export default function AdminPage() {
  const requests = useRequestsStore((s) => s.requests);
  const [selected, setSelected] = useState<ServiceRequest | null>(null);

  // Mantiene selezionata la versione aggiornata dopo ogni cambio di stato
  const selectedLive = selected ? requests.find((r) => r.id === selected.id) ?? null : null;

  return (
    <Container className="py-8 md:py-12">
      <div className="mb-6 rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-ink">
        Area dimostrativa — nessuna autenticazione reale è attiva.
      </div>

      <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">Oggi</h1>
      <div className="mt-4">
        <TodaySummary requests={requests} />
      </div>

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">Richieste da gestire</h2>

      {requests.length === 0 ? (
        <p className="mt-6 text-sm text-ink-soft">Nessuna richiesta ancora. Prova a lasciarne una da /richiesta.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {requests.map((r) => (
            <RequestCard key={r.id} request={r} onOpen={() => setSelected(r)} />
          ))}
        </div>
      )}

      {selectedLive && <RequestDetailPanel request={selectedLive} onClose={() => setSelected(null)} />}
    </Container>
  );
}
