import { CalendarDays } from "lucide-react";
import { ServiceRequest } from "@/types/request";

function formatDateLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short" });
}

export function UpcomingAppointments({ requests }: { requests: ServiceRequest[] }) {
  const upcoming = requests
    .filter((r) => r.status === "APPOINTMENT_CONFIRMED" && r.appointment)
    .sort((a, b) => {
      const aKey = `${a.appointment!.date}T${a.appointment!.time}`;
      const bKey = `${b.appointment!.date}T${b.appointment!.time}`;
      return aKey.localeCompare(bKey);
    });

  if (upcoming.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2">
        <CalendarDays size={20} className="text-forest" />
        <h2 className="font-display text-2xl font-semibold text-ink">Prossimi appuntamenti</h2>
      </div>
      <div className="mt-4 space-y-2">
        {upcoming.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/60 p-4">
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-ink">{r.pet.name}</p>
              <p className="truncate text-sm text-ink-soft">{r.customer.name}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold capitalize text-forest-dark">{formatDateLabel(r.appointment!.date)}</p>
              <p className="text-xs text-ink-soft">
                {r.appointment!.time}
                {r.appointment!.estimatedDurationMinutes ? ` · ~${r.appointment!.estimatedDurationMinutes} min` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
