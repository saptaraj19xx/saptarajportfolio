import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, Check, ImagePlus, LogOut, Pencil, Plus, Save, Trash2, Upload, Video, X } from "lucide-react";
import type { Project } from "../data/projects";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getStoredSession,
  isSupabaseConfigured,
  signIn,
  signOut,
  updateProject,
  uploadMedia,
  type Session,
} from "../lib/supabase";

type FormState = {
  name: string;
  category: string;
  description: string;
  live_url: string;
  published: boolean;
  featured: boolean;
  cover_image: string;
  secondary_image: string;
  hero_image: string;
  video_url: string;
  video_poster: string;
};

const emptyForm: FormState = {
  name: "",
  category: "Graphic Design",
  description: "",
  live_url: "",
  published: true,
  featured: false,
  cover_image: "",
  secondary_image: "",
  hero_image: "",
  video_url: "",
  video_poster: "",
};

const CATEGORIES = ["Graphic Design", "Video Editing", "UI/UX Design", "Branding", "Web Design", "Motion", "Creative Direction", "Social Media"];

function Login({ onLogin }: { onLogin: (session: Session) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const session = await signIn(email, password);
      onLogin(session);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C] px-5 text-[#D7E2EA]">
      <form onSubmit={submit} className="w-full max-w-md rounded-[35px] border border-[#D7E2EA]/15 bg-[#111113] p-6 sm:rounded-[45px] sm:p-10">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#D7E2EA]/45">Saptaraj / Portfolio</p>
        <h1 className="mb-8 text-4xl font-black uppercase sm:text-5xl">Admin</h1>

        <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="username"
          required
          className="mb-5 w-full rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4 py-3 text-[#D7E2EA] outline-none transition focus:border-[#D7E2EA]/50"
        />

        <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
          className="mb-5 w-full rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4 py-3 text-[#D7E2EA] outline-none transition focus:border-[#D7E2EA]/50"
        />

        {error ? <p className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-200">{error}</p> : null}

        <button disabled={busy} className="w-full rounded-full bg-[#D7E2EA] px-6 py-4 font-semibold uppercase tracking-widest text-[#0C0C0C] transition hover:opacity-85 disabled:opacity-50">
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <a href="/" className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/45 hover:text-[#D7E2EA]">
          <ArrowLeft size={14} /> Back to portfolio
        </a>
      </form>
    </div>
  );
}

function FileField({
  label,
  accept,
  value,
  onUpload,
}: {
  label: string;
  accept: string;
  value: string;
  onUpload: (file: File) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handle(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      await onUpload(file);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">{label}</label>
      <label className="flex min-h-28 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-[#D7E2EA]/20 bg-[#0C0C0C] p-4 text-center transition hover:border-[#D7E2EA]/45">
        <input type="file" accept={accept} className="hidden" onChange={(e) => void handle(e.target.files?.[0])} />
        <span className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/50">
          {busy ? <Upload className="animate-pulse" size={20} /> : value ? <Check size={20} /> : <ImagePlus size={20} />}
          {busy ? "Uploading…" : value ? "Uploaded — choose another to replace" : "Choose file"}
        </span>
      </label>
      {value ? <p className="mt-2 truncate text-[10px] text-[#D7E2EA]/35">{value}</p> : null}
      {error ? <p className="mt-2 text-xs text-red-200">{error}</p> : null}
    </div>
  );
}

function ProjectForm({
  initial,
  nextNumber,
  token,
  onSaved,
  onCancel,
}: {
  initial: Project | null;
  nextNumber: string;
  token: string;
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(() =>
    initial
      ? {
          name: initial.name,
          category: initial.category,
          description: initial.description || "",
          live_url: initial.live_url || "",
          published: initial.published,
          featured: Boolean(initial.featured),
          cover_image: initial.cover_image,
          secondary_image: initial.secondary_image,
          hero_image: initial.hero_image || "",
          video_url: initial.video_url || "",
          video_poster: initial.video_poster || "",
        }
      : emptyForm,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function upload(key: keyof FormState, file: File) {
    const url = await uploadMedia(file, token);
    set(key, url);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Project name is required.");
    if (!form.cover_image || !form.secondary_image) return setError("Please upload the first two project images.");

    setSaving(true);
    try {
      const payload = {
        number: initial?.number || nextNumber,
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        live_url: form.live_url.trim() || null,
        cover_image: form.cover_image,
        secondary_image: form.secondary_image,
        hero_image: form.hero_image || null,
        video_url: form.video_url.trim() || null,
        video_poster: form.video_poster || null,
        published: form.published,
        featured: form.featured,
        updated_at: new Date().toISOString(),
      };

      if (initial) await updateProject(initial.id, payload, token);
      else await createProject(payload, token);
      await onSaved();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[35px] border border-[#D7E2EA]/15 bg-[#111113] p-5 sm:rounded-[45px] sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/40">{initial ? `Edit / ${initial.number}` : `New / ${nextNumber}`}</p>
          <h2 className="mt-2 text-3xl font-black uppercase">{initial ? "Edit Project" : "Add Work"}</h2>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full border border-[#D7E2EA]/20 p-3 text-[#D7E2EA] hover:bg-white/10"><X size={18} /></button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Project title</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} required className="admin-input" placeholder="e.g. Brand Film — 2026" />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="admin-input">
            {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Live project URL (optional)</label>
          <input value={form.live_url} onChange={(e) => set("live_url", e.target.value)} type="url" className="admin-input" placeholder="https://…" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Description</label>
          <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className="admin-input resize-none" placeholder="What did you create? What was your role?" />
        </div>

        <FileField label="Image 01 — required" accept="image/*" value={form.cover_image} onUpload={(file) => upload("cover_image", file)} />
        <FileField label="Image 02 — required" accept="image/*" value={form.secondary_image} onUpload={(file) => upload("secondary_image", file)} />
        <FileField label="Image 03 — optional" accept="image/*" value={form.hero_image} onUpload={(file) => upload("hero_image", file)} />
        <FileField label="Video — optional" accept="video/mp4,video/webm,video/quicktime" value={form.video_url} onUpload={(file) => upload("video_url", file)} />
        <FileField label="Video poster — optional" accept="image/*" value={form.video_poster} onUpload={(file) => upload("video_poster", file)} />

        <div className="md:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#D7E2EA]/55">Or use a YouTube / Vimeo URL</label>
          <div className="flex items-center gap-3 rounded-2xl border border-[#D7E2EA]/15 bg-[#0C0C0C] px-4">
            <Video size={17} className="shrink-0 text-[#D7E2EA]/35" />
            <input value={form.video_url} onChange={(e) => set("video_url", e.target.value)} className="w-full bg-transparent py-3 text-sm text-[#D7E2EA] outline-none" placeholder="https://youtube.com/shorts/…" />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C] p-4">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} />
          <span><strong className="block text-sm uppercase">Published</strong><small className="text-xs text-[#D7E2EA]/40">Visible to everyone</small></span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D7E2EA]/10 bg-[#0C0C0C] p-4">
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          <span><strong className="block text-sm uppercase">Featured</strong><small className="text-xs text-[#D7E2EA]/40">Keep this flag for future featured layouts</small></span>
        </label>
      </div>

      {error ? <p className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-200">{error}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#D7E2EA] px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-[#0C0C0C] disabled:opacity-50">
          <Save size={16} /> {saving ? "Saving…" : initial ? "Save Changes" : "Publish Project"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-full border border-[#D7E2EA]/25 px-7 py-3.5 text-sm uppercase tracking-widest text-[#D7E2EA]">Cancel</button>
      </div>
    </form>
  );
}

function Dashboard({ session }: { session: Session }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      setProjects(await getAllProjects<Project>(session.access_token));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const nextNumber = useMemo(() => {
    const max = projects.reduce((highest, project) => Math.max(highest, Number.parseInt(project.number, 10) || 0), 0);
    return String(max + 1).padStart(2, "0");
  }, [projects]);

  async function remove(project: Project) {
    if (!window.confirm(`Delete "${project.name}"? This removes it from the public portfolio.`)) return;
    try {
      await deleteProject(project.id, session.access_token);
      await refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not delete project.");
    }
  }

  if (editing !== undefined) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] px-5 py-8 text-[#D7E2EA] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <ProjectForm initial={editing} nextNumber={nextNumber} token={session.access_token} onSaved={async () => { setEditing(undefined); await refresh(); }} onCancel={() => setEditing(undefined)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] px-5 py-8 text-[#D7E2EA] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#D7E2EA]/40">Saptaraj / Portfolio</p>
            <h1 className="mt-2 text-4xl font-black uppercase sm:text-6xl">Your Work</h1>
            <p className="mt-2 text-sm text-[#D7E2EA]/45">{session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <a href="/" className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 px-5 py-3 text-xs uppercase tracking-widest hover:bg-white/10">View site</a>
            <button onClick={() => { signOut(); window.location.reload(); }} className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 px-5 py-3 text-xs uppercase tracking-widest hover:bg-white/10"><LogOut size={15} /> Logout</button>
            <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 rounded-full bg-[#D7E2EA] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0C0C0C]"><Plus size={15} /> New work</button>
          </div>
        </header>

        {error ? <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200">{error}</div> : null}

        {loading ? <p className="py-20 text-center text-sm uppercase tracking-widest text-[#D7E2EA]/40">Loading projects…</p> : projects.length === 0 ? (
          <div className="rounded-[35px] border border-dashed border-[#D7E2EA]/20 px-6 py-24 text-center sm:rounded-[45px]">
            <Plus className="mx-auto mb-4 text-[#D7E2EA]/40" />
            <h2 className="text-2xl font-semibold uppercase">No projects yet</h2>
            <p className="mt-2 text-sm text-[#D7E2EA]/40">Upload your first piece of work and publish it.</p>
            <button onClick={() => setEditing(null)} className="mt-6 rounded-full bg-[#D7E2EA] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#0C0C0C]">Add first project</button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-[30px] border border-[#D7E2EA]/10 bg-[#111113]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0C0C0C]">
                  <img src={project.cover_image} alt="" className="h-full w-full object-cover" />
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${project.published ? "bg-[#D7E2EA] text-[#0C0C0C]" : "bg-black/70 text-[#D7E2EA]"}`}>
                    {project.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/40">{project.number} / {project.category}</p>
                  <h2 className="mt-2 truncate text-xl font-semibold uppercase">{project.name}</h2>
                  <div className="mt-5 flex gap-2">
                    <button onClick={() => setEditing(project)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/15 px-4 py-2.5 text-xs uppercase tracking-widest hover:bg-white/10"><Pencil size={14} /> Edit</button>
                    <button onClick={() => void remove(project)} className="rounded-full border border-red-300/15 px-4 py-2.5 text-red-200 hover:bg-red-400/10" aria-label={`Delete ${project.name}`}><Trash2 size={14} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(() => getStoredSession());

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C] px-5 text-[#D7E2EA]">
        <div className="max-w-xl rounded-[35px] border border-[#D7E2EA]/15 bg-[#111113] p-7 sm:rounded-[45px] sm:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D7E2EA]/40">Portfolio CMS</p>
          <h1 className="mt-3 text-4xl font-black uppercase">Connect Supabase</h1>
          <p className="mt-4 leading-relaxed text-[#D7E2EA]/60">
            The admin system is installed, but this site has no database credentials yet. Follow the setup guide in README.md, add the two Vite environment variables, then reopen /admin.
          </p>
          <a href="/" className="mt-7 inline-flex rounded-full bg-[#D7E2EA] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#0C0C0C]">Back to site</a>
        </div>
      </div>
    );
  }

  return session ? <Dashboard session={session} /> : <Login onLogin={setSession} />;
}
