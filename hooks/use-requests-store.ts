"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RequestStatus, ServiceRequest } from "@/types/request";
import { demoRequests } from "@/data/demo-requests";

type RequestsState = {
  requests: ServiceRequest[];
  addRequest: (request: ServiceRequest) => void;
  updateStatus: (id: string, status: RequestStatus) => void;
  setAppointment: (
    id: string,
    appointment: { date: string; time: string; estimatedDurationMinutes?: number }
  ) => void;
  setInternalNotes: (id: string, notes: string) => void;
  updateCustomerAndPet: (
    id: string,
    patch: { customer?: Partial<ServiceRequest["customer"]>; pet?: Partial<ServiceRequest["pet"]> }
  ) => void;
  deleteRequest: (id: string) => void;
};

export const useRequestsStore = create<RequestsState>()(
  persist(
    (set) => ({
      requests: demoRequests,

      addRequest: (request) => set((state) => ({ requests: [request, ...state.requests] })),

      updateStatus: (id, status) =>
        set((state) => ({
          requests: state.requests.map((r) => (r.id === id ? { ...r, status } : r)),
        })),

      setAppointment: (id, appointment) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id ? { ...r, appointment, status: "APPOINTMENT_CONFIRMED" } : r
          ),
        })),

      setInternalNotes: (id, internalNotes) =>
        set((state) => ({
          requests: state.requests.map((r) => (r.id === id ? { ...r, internalNotes } : r)),
        })),

      updateCustomerAndPet: (id, patch) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id === id
              ? {
                  ...r,
                  customer: { ...r.customer, ...patch.customer },
                  pet: { ...r.pet, ...patch.pet },
                }
              : r
          ),
        })),

      deleteRequest: (id) =>
        set((state) => ({ requests: state.requests.filter((r) => r.id !== id) })),
    }),
    { name: "baubbles-requests-store" }
  )
);
