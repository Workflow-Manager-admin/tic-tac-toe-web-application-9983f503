//
// API utility for communicating with the backend REST API.
//
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"; // TODO: Set in .env

// Helper to merge headers and normalize to Record<string, string>
function mergeHeaders(
  base: Record<string, string>,
  custom?: HeadersInit
): Record<string, string> {
  let result = { ...base };
  if (custom) {
    if (Array.isArray(custom)) {
      for (const [key, value] of custom) {
        result[key] = value;
      }
    } else if (custom instanceof Headers) {
      custom.forEach((value, key) => {
        result[key] = value;
      });
    } else {
      result = { ...result, ...custom };
    }
  }
  return result;
}

// PUBLIC_INTERFACE
export async function apiFetch(
  endpoint: string,
  options?: RequestInit,
  authToken?: string
) {
  /** This is a public function to fetch from the backend API with optional auth. */
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = mergeHeaders(
    { "Content-Type": "application/json" },
    options?.headers
  );
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  const res = await fetch(url, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw { status: res.status, ...error };
  }
  return res.json();
}
