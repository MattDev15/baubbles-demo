export type ServiceOption = {
  id: string;
  label: string;
};

// Indicativi: servono solo a far capire alla titolare cosa serve, NON
// determinano durata o prezzo (per esplicita richiesta della titolare).
export const serviceOptions: ServiceOption[] = [
  { id: "bagno", label: "Bagno" },
  { id: "taglio", label: "Taglio" },
  { id: "tosatura", label: "Tosatura" },
  { id: "spazzolatura", label: "Spazzolatura / snodatura" },
  { id: "unghie", label: "Unghie" },
  { id: "orecchie", label: "Pulizia orecchie" },
  { id: "altro", label: "Altro / Non sono sicuro" },
];

export const dayOptions = [
  { id: "lun", label: "Lun" },
  { id: "mar", label: "Mar" },
  { id: "mer", label: "Mer" },
  { id: "gio", label: "Gio" },
  { id: "ven", label: "Ven" },
  { id: "sab", label: "Sab" },
];
