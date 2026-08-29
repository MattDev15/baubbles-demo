import clsx from "clsx";
import { Phone, MessageCircle } from "lucide-react";
import { ServiceRequest, STATUS_LABELS } from "@/types/request";
import { serviceOptions } from "@/data/services";

const STATUS_DOT: Record<string, string> = {
  NEW: "bg-coral",
  TO_CONTACT: "bg-coral",
  CONTACTED: "bg-forest",
  APPOINTMENT_CONFIRMED: "bg-forest",
  COMPLETED: "bg-ink-soft",
  CANCELLED: "bg-ink-soft",
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins} min fa`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "ora" : "ore"} fa`;
  const days = Math.round(hours / 24);
  return `${days} ${days === 1 ? "giorno" : "giorni"} fa`;
}

export function RequestCard({ request, onOpen }: { request: ServiceRequest; onOpen: () => void }) {
  const serviceLabels = request.requestedServices
    .map((id) => serviceOptions.find((s) => s.id === id)?.label)
    .filter(Boolean)
    .join(" + ");

  return (
    <button
      onClick={onOpen}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-white/60 p-4 text-left transition-colors hover:border-forest/40"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className={clsx("h-2 w-2 shrink-0 rounded-full", STATUS_DOT[request.status])} />
          <p className="truncate font-display text-lg font-semibold text-ink">{request.pet.name}</p>
        </div>
        <p className="mt-0.5 truncate text-sm text-ink-soft">
          {request.pet.size ?? "—"} {request.pet.breed ? `· ${request.pet.breed}` : ""}
        </p>
        {serviceLabels && <p className="mt-0.5 truncate text-sm text-ink-soft">{serviceLabels}</p>}
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
          {request.customer.preferredContact === "PHONE" && <Phone size={12} />}
          {request.customer.preferredContact === "WHATSAPP" && <MessageCircle size={12} />}
          {request.customer.preferredContact === "PHONE" ? "Preferisce telefonata" : request.customer.preferredContact === "WHATSAPP" ? "Preferisce WhatsApp" : "Nessuna preferenza"}
          {" · "}
          {timeAgo(request.createdAt)}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-cream-soft px-3 py-1.5 text-xs font-semibold text-ink">
        {STATUS_LABELS[request.status]}
      </span>
    </button>
  );
}
