/**
 * Baubbles usa un modello "PROFESSIONAL_REVIEW": il cliente lascia una
 * richiesta con le informazioni essenziali, la titolare la valuta e
 * ricontatta. Non esiste slot/capacità/durata calcolata automaticamente —
 * a differenza del modello "DIRECT_BOOKING" usato da Michele & Mirela e
 * Mille Pieghe, qui il sistema non assegna mai un appuntamento da solo.
 */
export type RequestMode = "DIRECT_BOOKING" | "PROFESSIONAL_REVIEW";

export type PetType = "DOG" | "CAT" | "OTHER";
export type PetSize = "SMALL" | "MEDIUM" | "LARGE" | "XL";
export type PreferredContact = "PHONE" | "WHATSAPP" | "ANY";
export type PreferredTimeOfDay = "MORNING" | "AFTERNOON" | "ANY";

export type RequestStatus =
  | "NEW"
  | "TO_CONTACT"
  | "CONTACTED"
  | "APPOINTMENT_CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export const STATUS_LABELS: Record<RequestStatus, string> = {
  NEW: "Nuova",
  TO_CONTACT: "Da ricontattare",
  CONTACTED: "Contattato",
  APPOINTMENT_CONFIRMED: "Appuntamento confermato",
  COMPLETED: "Completato",
  CANCELLED: "Annullato",
};

export type ServiceRequest = {
  id: string;

  customer: {
    name: string;
    phone: string;
    preferredContact: PreferredContact;
    preferredTimeOfDay?: PreferredTimeOfDay;
  };

  pet: {
    name: string;
    type: PetType;
    breed?: string;
    size?: PetSize;
  };

  requestedServices: string[]; // id dei servizi indicativi selezionati
  customerNotes?: string;
  photos?: string[]; // data URL, solo in memoria per la demo

  preferredDays?: string[]; // "flessibile" oppure giorni della settimana indicativi

  status: RequestStatus;

  // Compilati manualmente dalla titolare DOPO il contatto — mai calcolati
  // automaticamente dal sistema.
  appointment?: {
    date: string;
    time: string;
    estimatedDurationMinutes?: number;
  };
  internalNotes?: string;

  createdAt: string;
};
