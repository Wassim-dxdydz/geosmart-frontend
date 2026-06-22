// lib/usePredict.ts
// Hook that calls our Next.js proxy -> Django API

export interface PredictInput {
  soil_type: string;  // argile | limons | marne | sable
  test_type: string;  // uu | cu | cd
  FC: string;
  WL: string;
  IP: string;
  MC: string;
  SR: string;
  ROD: string;
}

export interface PredictResult {
  cohesion:   number;
  phi:        number;
  confidence: number;
  soil_label: string;
}

export async function predict(inputs: PredictInput): Promise<PredictResult> {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      soil_type: inputs.soil_type,
      test_type: inputs.test_type,
      FC:  parseFloat(inputs.FC),
      WL:  parseFloat(inputs.WL),
      IP:  parseFloat(inputs.IP),
      MC:  parseFloat(inputs.MC),
      SR:  parseFloat(inputs.SR  || "0"),
      ROD: parseFloat(inputs.ROD),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Prediction failed");
  }

  return res.json();
}