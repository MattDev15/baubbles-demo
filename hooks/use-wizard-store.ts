"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PetSize, PetType, PreferredContact, PreferredTimeOfDay } from "@/types/request";

export type WizardDraft = {
  step: number;
  petName?: string;
  petType?: PetType;
  petBreed?: string;
  petSize?: PetSize;
  requestedServices: string[];
  customerNotes?: string;
  photos: string[]; // data URL in memoria, solo per la demo
  preferredContact?: PreferredContact;
  preferredTimeOfDay?: PreferredTimeOfDay;
  customerName?: string;
  phone?: string;
  preferredDays: string[]; // include eventualmente "flessibile"
};

const emptyDraft: WizardDraft = { step: 1, requestedServices: [], photos: [], preferredDays: [] };

type WizardState = {
  draft: WizardDraft;
  setDraft: (patch: Partial<WizardDraft>) => void;
  setStep: (step: number) => void;
  resetDraft: () => void;
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      draft: emptyDraft,
      setDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),
      setStep: (step) => set((state) => ({ draft: { ...state.draft, step } })),
      resetDraft: () => set({ draft: emptyDraft }),
    }),
    { name: "baubbles-wizard-draft" }
  )
);
