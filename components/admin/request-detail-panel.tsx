"use client";

import { useState } from "react";
import clsx from "clsx";
import { X, Phone, MessageCircle } from "lucide-react";
import { RequestStatus, STATUS_LABELS, ServiceRequest } from "@/types/request";
import { useRequestsStore } from "@/hooks/use-requests-store";
import { serviceOptions, dayOptions } from "@/data/services";

const statusFlow: RequestStatus[] = ["NEW", "TO_CONTACT", "CONTACTED", "APPOINTMENT_CONFIRMED", "COMPLETED"];

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-line/60 py-2 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

export function RequestDetailPanel({ request, onClose }: { request: ServiceRequest; onClose: () => void }) {
  const updateStatus = useRequestsStore((s) => s.updateStatus);
  const setAppointment = useRequestsStore((s) => s.setAppointment);
  const setInternalNotes = useRequestsStore((s) => s.setInternalNotes);

  const [apptDate, setApptDate] = useState(request.appointment?.date ?? "");
  const [apptTime, setApptTime] = useState(request.appointment?.time ?? "");
  const [apptDuration, setApptDuration] = useState(request.appointment?.estimatedDurationMinutes?.toString() ?? "");
  const [internalNotes, setInternalNotesLocal] = useState(request.internalNotes ?? "");

  const serviceLabels = request.requestedServices
    .map((id) => serviceOptions.find((s) => s.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const dayLabels = request.preferredDays?.includes("flessibile")
    ? "Flessibile"
    : request.preferredDays?.map((id) => dayOptions.find((d) => d.id === id)?.label).filter(Boolean).join(", ");

  const waMessage = `Ciao ${request.customer.name}, ti scriviamo da Baubbles riguardo alla richiesta per ${request.pet.name}.`;
  const waHref = `https://wa.me/39${request.customer.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(waMessage)}`;

  function saveAppointment() {
    if (!apptDate || !apptTime) return;
    setAppointment(request.id, {
      date: apptDate,
      time: apptTime,
      estimatedDurationMinutes: apptDuration ? Number(apptDuration) : undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/30" onClick={onClose}>
      <div className="h-full w-full max-w-md overflow-y-auto bg-cream p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">{request.pet.name}</h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-cream-soft" aria-label="Chiudi">
            <X size={20} />
          </button>
        </div>

        {/* Cliente */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-ink">Cliente</p>
          <div className="mt-2 space-y-1">
            <DetailRow label="Nome" value={request.customer.name} />
            <DetailRow label="Telefono" value={request.customer.phone} />
            <DetailRow label="Metodo preferito" value={request.customer.preferredContact === "PHONE" ? "Telefonata" : request.customer.preferredContact === "WHATSAPP" ? "WhatsApp" : "Nessuna preferenza"} />
            <DetailRow label="Fascia preferita" value={request.customer.preferredTimeOfDay === "MORNING" ? "Mattina" : request.customer.preferredTimeOfDay === "AFTERNOON" ? "Pomeriggio" : request.customer.preferredTimeOfDay === "ANY" ? "Indifferente" : undefined} />
          </div>
          <div className="mt-3 flex gap-2">
            <a href={`tel:${request.customer.phone.replace(/\s+/g, "")}`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-cream hover:bg-forest-dark">
              <Phone size={16} /> Chiama
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coral px-4 py-3 text-sm font-semibold text-cream hover:bg-coral-dark">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Animale */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">Animale</p>
          <div className="mt-2 space-y-1">
            <DetailRow label="Nome" value={request.pet.name} />
            <DetailRow label="Tipo" value={request.pet.type === "DOG" ? "Cane" : request.pet.type === "CAT" ? "Gatto" : "Altro"} />
            <DetailRow label="Razza" value={request.pet.breed} />
            <DetailRow label="Taglia" value={request.pet.size} />
          </div>
        </div>

        {/* Richiesta */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">Richiesta</p>
          <div className="mt-2 space-y-1">
            <DetailRow label="Servizi indicati" value={serviceLabels || undefined} />
            <DetailRow label="Note" value={request.customerNotes} />
            <DetailRow label="Giorni preferiti" value={dayLabels || undefined} />
          </div>
          {request.photos && request.photos.length > 0 && (
            <div className="mt-2 flex gap-2">
              {request.photos.map((photo, i) => (
                /* eslint-disable-next-line @next/next/no-img-element -- data URL locale, next/image non applicabile in demo */
                <img key={i} src={photo} alt={`Foto ${i + 1}`} className="h-16 w-16 rounded-lg border border-line object-cover" />
              ))}
            </div>
          )}
        </div>

        {/* Stato */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">Stato</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {statusFlow.map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(request.id, s)}
                className={clsx(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  request.status === s ? "border-forest bg-forest text-cream" : "border-line bg-white/60 text-ink hover:border-forest/40"
                )}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
            <button
              onClick={() => updateStatus(request.id, "CANCELLED")}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                request.status === "CANCELLED" ? "border-coral bg-coral text-cream" : "border-line bg-white/60 text-coral-dark hover:border-coral"
              )}
            >
              Annulla
            </button>
          </div>
        </div>

        {/* Appuntamento manuale */}
        <div className="mt-6 rounded-2xl border border-line bg-white/60 p-4">
          <p className="text-sm font-semibold text-ink">Dopo il contatto: fissa l&apos;appuntamento</p>
          <p className="mt-1 text-xs text-ink-soft">Data, ora e durata sono decise da te — nessun calcolo automatico.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input type="date" value={apptDate} onChange={(e) => setApptDate(e.target.value)} className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-forest" />
            <input type="time" value={apptTime} onChange={(e) => setApptTime(e.target.value)} className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-forest" />
          </div>
          <input
            type="number"
            min={0}
            placeholder="Durata stimata (minuti, facoltativo)"
            value={apptDuration}
            onChange={(e) => setApptDuration(e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-forest"
          />
          <button onClick={saveAppointment} disabled={!apptDate || !apptTime} className="mt-3 w-full rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream hover:bg-forest-dark disabled:opacity-40">
            Salva appuntamento
          </button>
          {request.appointment && (
            <p className="mt-2 text-xs text-forest-dark">
              Confermato: {request.appointment.date} alle {request.appointment.time}
              {request.appointment.estimatedDurationMinutes ? ` · ~${request.appointment.estimatedDurationMinutes} min` : ""}
            </p>
          )}
        </div>

        {/* Note interne */}
        <div className="mt-6">
          <label htmlFor="internalNotes" className="text-sm font-semibold text-ink">Note interne</label>
          <textarea
            id="internalNotes"
            value={internalNotes}
            onChange={(e) => setInternalNotesLocal(e.target.value)}
            onBlur={() => setInternalNotes(request.id, internalNotes)}
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-line bg-white/70 px-4 py-2.5 text-sm outline-none focus:border-forest"
            placeholder="Visibili solo a te..."
          />
        </div>
      </div>
    </div>
  );
}
