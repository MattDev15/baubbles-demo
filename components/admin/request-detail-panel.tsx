"use client";

import { useState } from "react";
import clsx from "clsx";
import { X, Phone, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { PetSize, PetType, PreferredContact, RequestStatus, STATUS_LABELS, ServiceRequest } from "@/types/request";
import { useRequestsStore } from "@/hooks/use-requests-store";
import { serviceOptions, dayOptions } from "@/data/services";

const statusFlow: RequestStatus[] = ["NEW", "TO_CONTACT", "CONTACTED", "APPOINTMENT_CONFIRMED", "COMPLETED"];

const STATUS_BADGE_CLASSES: Record<RequestStatus, string> = {
  NEW: "border-coral bg-coral text-cream",
  TO_CONTACT: "border-coral/40 bg-coral/15 text-coral-dark",
  CONTACTED: "border-forest/40 bg-forest/15 text-forest-dark",
  APPOINTMENT_CONFIRMED: "border-forest bg-forest text-cream",
  COMPLETED: "border-line bg-cream-soft text-ink-soft",
  CANCELLED: "border-line bg-ink/10 text-ink-soft",
};

const contactLabels: Record<PreferredContact, string> = {
  PHONE: "Telefonata",
  WHATSAPP: "WhatsApp",
  ANY: "Nessuna preferenza",
};

const petTypeLabels: Record<PetType, string> = { DOG: "Cane", CAT: "Gatto", OTHER: "Altro" };

const petSizeOptions: PetSize[] = ["SMALL", "MEDIUM", "LARGE", "XL"];

const fieldClass = "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-forest";

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-line/60 py-2 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

export function RequestDetailPanel({ request, onClose }: { request: ServiceRequest; onClose: () => void }) {
  const updateStatus = useRequestsStore((s) => s.updateStatus);
  const setAppointment = useRequestsStore((s) => s.setAppointment);
  const setInternalNotes = useRequestsStore((s) => s.setInternalNotes);
  const updateCustomerAndPet = useRequestsStore((s) => s.updateCustomerAndPet);
  const deleteRequest = useRequestsStore((s) => s.deleteRequest);

  const [apptDate, setApptDate] = useState(request.appointment?.date ?? "");
  const [apptTime, setApptTime] = useState(request.appointment?.time ?? "");
  const [apptDuration, setApptDuration] = useState(request.appointment?.estimatedDurationMinutes?.toString() ?? "");
  const [internalNotes, setInternalNotesLocal] = useState(request.internalNotes ?? "");

  const [isEditing, setIsEditing] = useState(false);
  const [customerName, setCustomerName] = useState(request.customer.name);
  const [customerPhone, setCustomerPhone] = useState(request.customer.phone);
  const [preferredContact, setPreferredContact] = useState<PreferredContact>(request.customer.preferredContact);
  const [petName, setPetName] = useState(request.pet.name);
  const [petType, setPetType] = useState<PetType>(request.pet.type);
  const [petBreed, setPetBreed] = useState(request.pet.breed ?? "");
  const [petSize, setPetSize] = useState<PetSize | "">(request.pet.size ?? "");

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

  function startEditing() {
    setCustomerName(request.customer.name);
    setCustomerPhone(request.customer.phone);
    setPreferredContact(request.customer.preferredContact);
    setPetName(request.pet.name);
    setPetType(request.pet.type);
    setPetBreed(request.pet.breed ?? "");
    setPetSize(request.pet.size ?? "");
    setIsEditing(true);
  }

  function saveEdits() {
    updateCustomerAndPet(request.id, {
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        preferredContact,
      },
      pet: {
        name: petName.trim(),
        type: petType,
        breed: petBreed.trim() || undefined,
        size: petSize || undefined,
      },
    });
    setIsEditing(false);
  }

  function handleDelete() {
    const ok = window.confirm(
      `Eliminare definitivamente la richiesta di ${request.customer.name} per ${request.pet.name}?`
    );
    if (!ok) return;
    deleteRequest(request.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/30" onClick={onClose}>
      <div className="h-full w-full max-w-md overflow-y-auto bg-cream p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl font-semibold text-ink">{request.pet.name}</h2>
            <span className={clsx("rounded-full border px-3 py-1 text-xs font-semibold", STATUS_BADGE_CLASSES[request.status])}>
              {STATUS_LABELS[request.status]}
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-cream-soft" aria-label="Chiudi">
            <X size={20} />
          </button>
        </div>

        {/* Cliente e animale */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink">Cliente</p>
          {!isEditing && (
            <button
              onClick={startEditing}
              className="flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-forest/40"
            >
              <Pencil size={14} /> Modifica
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="mt-3 space-y-3 rounded-2xl border border-forest/30 bg-white/60 p-4">
            <EditField label="Nome cliente">
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={fieldClass} />
            </EditField>
            <EditField label="Telefono">
              <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className={fieldClass} />
            </EditField>
            <EditField label="Metodo preferito">
              <select value={preferredContact} onChange={(e) => setPreferredContact(e.target.value as PreferredContact)} className={fieldClass}>
                {(Object.keys(contactLabels) as PreferredContact[]).map((c) => (
                  <option key={c} value={c}>{contactLabels[c]}</option>
                ))}
              </select>
            </EditField>

            <p className="pt-1 text-sm font-semibold text-ink">Animale</p>
            <EditField label="Nome animale">
              <input value={petName} onChange={(e) => setPetName(e.target.value)} className={fieldClass} />
            </EditField>
            <EditField label="Tipo">
              <select value={petType} onChange={(e) => setPetType(e.target.value as PetType)} className={fieldClass}>
                {(Object.keys(petTypeLabels) as PetType[]).map((t) => (
                  <option key={t} value={t}>{petTypeLabels[t]}</option>
                ))}
              </select>
            </EditField>
            <EditField label="Razza">
              <input value={petBreed} onChange={(e) => setPetBreed(e.target.value)} className={fieldClass} />
            </EditField>
            <EditField label="Taglia">
              <select value={petSize} onChange={(e) => setPetSize(e.target.value as PetSize | "")} className={fieldClass}>
                <option value="">Non indicata</option>
                {petSizeOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </EditField>

            <div className="flex gap-2 pt-1">
              <button
                onClick={saveEdits}
                disabled={!customerName.trim() || !customerPhone.trim() || !petName.trim()}
                className="flex-1 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark disabled:opacity-40"
              >
                Salva modifiche
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-full border border-line bg-white/60 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-forest/40"
              >
                Annulla
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-2 space-y-1">
              <DetailRow label="Nome" value={request.customer.name} />
              <DetailRow label="Telefono" value={request.customer.phone} />
              <DetailRow label="Metodo preferito" value={contactLabels[request.customer.preferredContact]} />
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

            {/* Animale */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">Animale</p>
              <div className="mt-2 space-y-1">
                <DetailRow label="Nome" value={request.pet.name} />
                <DetailRow label="Tipo" value={petTypeLabels[request.pet.type]} />
                <DetailRow label="Razza" value={request.pet.breed} />
                <DetailRow label="Taglia" value={request.pet.size} />
              </div>
            </div>
          </>
        )}

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

        {/* Eliminazione */}
        <div className="mt-8 border-t border-line pt-5">
          <button
            onClick={handleDelete}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-coral px-4 py-2.5 text-sm font-semibold text-coral-dark transition-colors hover:bg-coral hover:text-cream"
          >
            <Trash2 size={16} /> Elimina richiesta
          </button>
          <p className="mt-2 text-center text-xs text-ink-soft">L&apos;eliminazione è definitiva e non può essere annullata.</p>
        </div>
      </div>
    </div>
  );
}
