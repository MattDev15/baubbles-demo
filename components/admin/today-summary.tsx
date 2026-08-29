import { ServiceRequest } from "@/types/request";

function isToday(iso?: string): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

export function TodaySummary({ requests }: { requests: ServiceRequest[] }) {
  const confirmedToday = requests.filter((r) => r.appointment && isToday(r.appointment.date)).length;
  const newRequests = requests.filter((r) => r.status === "NEW").length;
  const toContact = requests.filter((r) => r.status === "TO_CONTACT").length;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-2xl border border-line bg-white/60 p-4 text-center">
        <p className="font-display text-3xl font-semibold text-forest-dark">{confirmedToday}</p>
        <p className="mt-1 text-xs font-medium text-ink-soft">Appuntamenti oggi</p>
      </div>
      <div className="rounded-2xl border border-line bg-white/60 p-4 text-center">
        <p className="font-display text-3xl font-semibold text-coral-dark">{newRequests}</p>
        <p className="mt-1 text-xs font-medium text-ink-soft">Nuove richieste</p>
      </div>
      <div className="rounded-2xl border border-line bg-white/60 p-4 text-center">
        <p className="font-display text-3xl font-semibold text-coral-dark">{toContact}</p>
        <p className="mt-1 text-xs font-medium text-ink-soft">Da richiamare</p>
      </div>
    </div>
  );
}
