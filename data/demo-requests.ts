import { ServiceRequest } from "@/types/request";

export const demoRequests: ServiceRequest[] = [
  {
    id: "demo_luna",
    customer: { name: "Chiara", phone: "339 111 2233", preferredContact: "PHONE" },
    pet: { name: "Luna", type: "DOG", breed: "Barboncino", size: "MEDIUM" },
    requestedServices: ["bagno", "taglio"],
    customerNotes: "Pelo con qualche nodo, soprattutto dietro le orecchie.",
    preferredDays: ["flessibile"],
    status: "NEW",
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: "demo_thor",
    customer: { name: "Marco", phone: "347 222 3344", preferredContact: "WHATSAPP", preferredTimeOfDay: "AFTERNOON" },
    pet: { name: "Thor", type: "DOG", breed: "Golden Retriever", size: "LARGE" },
    requestedServices: ["bagno", "spazzolatura"],
    customerNotes: "Prima volta in toelettatura, un po' timoroso.",
    preferredDays: ["sab"],
    status: "TO_CONTACT",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "demo_mia",
    customer: { name: "Giulia", phone: "333 555 6677", preferredContact: "ANY" },
    pet: { name: "Mia", type: "DOG", size: "SMALL" },
    requestedServices: ["unghie"],
    preferredDays: ["flessibile"],
    status: "CONTACTED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];
