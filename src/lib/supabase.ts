export type AuthUser = {
  id: string;
  email?: string;
};

export type Session = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "") ?? "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || "portfolio-media";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const STORAGE_KEY = "saptaraj_portfolio_session";

export function getStoredSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session | null) {
  if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  else sessionStorage.removeItem(STORAGE_KEY);
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      ...(options.body instanceof FormData || options.body instanceof Blob ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    let message = body;
    try {
      const parsed = JSON.parse(body) as { message?: string; error_description?: string; hint?: string };
      message = parsed.message || parsed.error_description || body;
      if (parsed.hint) message += ` ${parsed.hint}`;
    } catch {
      // Keep the raw response.
    }
    throw new Error(message || `Request failed (${response.status})`);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export async function signIn(email: string, password: string) {
  const data = await request<{
    access_token: string;
    refresh_token: string;
    user: AuthUser;
  }>("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const session: Session = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user: data.user,
  };
  saveSession(session);
  return session;
}

export function signOut() {
  saveSession(null);
}

export async function getPublicProjects<T>() {
  return request<T[]>("/rest/v1/projects?select=*&published=eq.true&order=created_at.desc");
}

export async function getAllProjects<T>(token: string) {
  return request<T[]>("/rest/v1/projects?select=*&order=created_at.desc", {}, token);
}

export async function createProject<T>(project: T, token: string) {
  const rows = await request<T[]>("/rest/v1/projects", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(project),
  }, token);
  return rows[0];
}

export async function updateProject<T>(id: string, project: T, token: string) {
  const rows = await request<T[]>(`/rest/v1/projects?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(project),
  }, token);
  return rows[0];
}

export async function deleteProject(id: string, token: string) {
  await request<void>(`/rest/v1/projects?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
  }, token);
}

export async function uploadMedia(file: File, token: string) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${crypto.randomUUID()}-${safeName}`;
  await request<void>(`/storage/v1/object/${SUPABASE_BUCKET}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body: file,
  }, token);
  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`;
}
