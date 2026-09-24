const API_BASE_URL = "http://127.0.0.1:8000";

export interface BackendHealth {
  status: string;
}

export interface OhmsLawResult {
  voltage: number;
  resistance: number;
  current: number;
  error?: string;
}


export async function checkBackendHealth(): Promise<BackendHealth> {
  const response = await fetch(
    `${API_BASE_URL}/health`
  );

  if (!response.ok) {
    throw new Error(
      `Backend request failed: ${response.status}`
    );
  }

  return response.json();
}


export async function calculateOhmsLaw(
  voltage: number,
  resistance: number
): Promise<OhmsLawResult> {
  const response = await fetch(
    `${API_BASE_URL}/api/ohms-law?voltage=${voltage}&resistance=${resistance}`
  );

  if (!response.ok) {
    throw new Error(
      `Ohm's Law API failed: ${response.status}`
    );
  }

  return response.json();
}   