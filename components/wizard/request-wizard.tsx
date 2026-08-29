"use client";

import { useState } from "react";
import { useWizardStore } from "@/hooks/use-wizard-store";
import { useRequestsStore } from "@/hooks/use-requests-store";
import { WizardProgress } from "@/components/wizard/wizard-controls";
import { StepPet } from "@/components/wizard/steps/step-pet";
import { StepServices } from "@/components/wizard/steps/step-services";
import { StepNotes } from "@/components/wizard/steps/step-notes";
import { StepContact } from "@/components/wizard/steps/step-contact";
import { StepDays } from "@/components/wizard/steps/step-days";
import { StepSummary } from "@/components/wizard/steps/step-summary";
import { RequestConfirmation } from "@/components/wizard/request-confirmation";
import { ServiceRequest } from "@/types/request";

const TOTAL_STEPS = 6;

export function RequestWizard() {
  const { draft, setStep, resetDraft } = useWizardStore();
  const addRequest = useRequestsStore((s) => s.addRequest);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const step = draft.step;
  const goTo = (n: number) => setStep(Math.min(Math.max(n, 1), TOTAL_STEPS));
  const next = () => goTo(step + 1);
  const back = () => goTo(step - 1);

  function handleSubmit() {
    setSubmitting(true);
    const request: ServiceRequest = {
      id: `req_${Date.now()}`,
      customer: {
        name: draft.customerName ?? "",
        phone: draft.phone ?? "",
        preferredContact: draft.preferredContact ?? "ANY",
        preferredTimeOfDay: draft.preferredTimeOfDay,
      },
      pet: {
        name: draft.petName ?? "",
        type: draft.petType ?? "OTHER",
        breed: draft.petBreed,
        size: draft.petSize,
      },
      requestedServices: draft.requestedServices,
      customerNotes: draft.customerNotes,
      photos: draft.photos,
      preferredDays: draft.preferredDays,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      addRequest(request);
      setSubmitting(false);
      setSubmitted(true);
      resetDraft();
    }, 500);
  }

  if (submitted) return <RequestConfirmation />;

  return (
    <div>
      <WizardProgress step={step} total={TOTAL_STEPS} />
      {step === 1 && <StepPet onNext={next} />}
      {step === 2 && <StepServices onNext={next} onBack={back} />}
      {step === 3 && <StepNotes onNext={next} onBack={back} />}
      {step === 4 && <StepContact onNext={next} onBack={back} />}
      {step === 5 && <StepDays onNext={next} onBack={back} />}
      {step === 6 && <StepSummary onBack={back} onSubmit={handleSubmit} submitting={submitting} />}
    </div>
  );
}
