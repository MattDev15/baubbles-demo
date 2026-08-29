/**
 * Config centralizzata dei dati Baubbles.
 * Unico dato verificato: il numero WhatsApp fornito esplicitamente.
 * Indirizzo, anni di attività, recensioni: NON inventati — lasciati come
 * placeholder da completare quando disponibili.
 */
export const brand = {
  name: "Baubbles",
  tagline: "Toelettatura con cura, per il tuo migliore amico.",
  whatsappNumber: "393898476439", // formato internazionale senza spazi/+
  whatsappDefaultMessage: "Ciao, vorrei chiedere informazioni per la toelettatura del mio animale.",
  // ASSUNZIONE non verificata: uso lo stesso numero WhatsApp anche per la
  // CTA "Chiama", perché in Italia il cellulare del titolare spesso serve
  // per entrambi. Se il numero per le chiamate è diverso, sostituire qui.
  phoneDisplay: "389 847 6439",
  phoneTel: "3898476439",
  address: undefined as string | undefined, // non fornito: da completare
};
