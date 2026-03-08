import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  Edit3,
  X,
  Camera,
  Upload,
  Phone,
  Mail,
  Link,
  ArrowLeft,
  Save,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/client";
import { showToast } from "../components/Alert";

const demoMembers = [
  {
    id: 1,
    name: "Maître Borgel",
    role: "Avocat associé fondateur",
    biography: "Fondateur du cabinet en 2005, expert en dommage corporel.",
    is_active: true,
    order: 1,
    phone: "0491335000",
    email: "borgel@cabinet.fr",
    linkedin: "",
    photo: null,
  },
  {
    id: 2,
    name: "Sophie Durand",
    role: "Avocate senior",
    biography: "Spécialisée en responsabilité médicale.",
    is_active: true,
    order: 2,
    phone: "",
    email: "durand@cabinet.fr",
    linkedin: "",
    photo: null,
  },
  {
    id: 3,
    name: "Thomas Martin",
    role: "Avocat collaborateur",
    biography: "Collaborateur depuis 2020.",
    is_active: true,
    order: 3,
    phone: "",
    email: "martin@cabinet.fr",
    linkedin: "",
    photo: null,
  },
];

const demoExpertises = [
  {
    id: 1,
    name: "Accident de la Circulation",
    slug: "accidents-circulation",
    icon: "🚗",
  },
  { id: 2, name: "Agressions et Infractions", slug: "agressions", icon: "🛡️" },
  { id: 3, name: "Victimes d'Attentat", slug: "victimes-attentat", icon: "⚖️" },
  { id: 4, name: "Accident Médical", slug: "accident-medical", icon: "🏥" },
  { id: 5, name: "Accident du Travail", slug: "accidents-travail", icon: "⚙️" },
  {
    id: 6,
    name: "Accident de la Vie Courante",
    slug: "accident-vie-courante",
    icon: "🏠",
  },
  {
    id: 7,
    name: "Contentieux Droit des Assurances",
    slug: "assurance-dommage",
    icon: "📋",
  },
  {
    id: 8,
    name: "Réparation du Préjudice Corporel",
    slug: "prejudice-corporel",
    icon: "💙",
  },
  {
    id: 9,
    name: "Médecin de Recours et Expertise",
    slug: "expertise-medicale",
    icon: "🩺",
  },
];

const ROLES = ["Avocat associé", "Avocat", "Juriste", "Assistante juridique"];

const emptyForm = {
  name: "",
  role: "",
  biography: "",
  phone: "",
  email: "",
  linkedin: "",
  twitter: "",
  facebook: "",
  is_active: true,
  order: 0,
};

export default function TeamAdmin() {
  const [members, setMembers] = useState<any[]>([]);
  const [expertises, setExpertises] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [selectedExp, setSelectedExp] = useState<number[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<any>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      API.get("/team/")
        .then((r) => setMembers(r.data.results || r.data))
        .catch(() => setMembers(demoMembers)),
      API.get("/expertises/")
        .then((r) => setExpertises(r.data.results || r.data))
        .catch(() => setExpertises(demoExpertises)),
    ]).finally(() => setLoading(false));
  }, []);

  const displayed = (members.length > 0 ? members : demoMembers).filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setSelectedExp([]);
    setPhotoFile(null);
    setPhotoPreview("");
    setView("form");
  };

  const openEdit = async (m: any) => {
    setEditing(m);
    setPhotoFile(null);
    setPhotoPreview(m.photo || "");
    setView("form");

    // Lire les données complètes depuis l'API pour avoir expertise_ids à jour
    try {
      const res = await API.get(`/admin/team/${m.id}/`);
      const full = res.data;
      setForm({
        name: full.name || "",
        role: full.role || "",
        biography: full.biography || "",
        phone: full.phone || "",
        email: full.email || "",
        linkedin: full.linkedin || "",
        twitter: full.twitter || "",
        facebook: full.facebook || "",
        is_active: full.is_active,
        order: full.order || 0,
      });
      // expertises_detail = [{id, name, ...}] — on extrait les IDs
      const ids = (full.expertises_detail || []).map((e: any) => e.id);
      setSelectedExp(ids);
      if (full.photo) setPhotoPreview(full.photo);
    } catch {
      // Fallback: utiliser les données de la liste
      setForm({
        name: m.name || "",
        role: m.role || "",
        biography: m.biography || "",
        phone: m.phone || "",
        email: m.email || "",
        linkedin: m.linkedin || "",
        twitter: m.twitter || "",
        facebook: m.facebook || "",
        is_active: m.is_active,
        order: m.order || 0,
      });
      // expertise_ids est maintenant dans le list serializer
      setSelectedExp(m.expertise_ids || []);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!form.name || !form.role) {
      showToast("error", "Le nom et le rôle sont obligatoires");
      return;
    }
    setSaving(true);
    try {
      let res;
      if (photoFile) {
        // Avec photo : FormData
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("role", form.role);
        fd.append("biography", form.biography || "");
        fd.append("phone", form.phone || "");
        fd.append("email", form.email || "");
        fd.append("linkedin", form.linkedin || "");
        fd.append("twitter", form.twitter || "");
        fd.append("facebook", form.facebook || "");
        fd.append("is_active", String(form.is_active));
        fd.append("order", String(form.order || 0));
        fd.append("skills", "[]");
        selectedExp.forEach((id) => fd.append("expertise_ids", String(id)));
        fd.append("photo", photoFile);
        const cfg = { headers: { "Content-Type": "multipart/form-data" } };
        if (editing) {
          res = await API.patch(`/admin/team/${editing.id}/`, fd, cfg);
        } else {
          res = await API.post("/admin/team/", fd, cfg);
        }
      } else {
        // Sans photo : JSON pur
        const payload = {
          name: form.name,
          role: form.role,
          biography: form.biography || "",
          phone: form.phone || "",
          email: form.email || "",
          linkedin: form.linkedin || "",
          twitter: form.twitter || "",
          facebook: form.facebook || "",
          is_active: form.is_active,
          order: form.order || 0,
          skills: [],
          expertise_ids: selectedExp,
        };
        if (editing) {
          res = await API.patch(`/admin/team/${editing.id}/`, payload);
        } else {
          res = await API.post("/admin/team/", payload);
        }
      }

      if (editing) {
        setMembers((p) =>
          p.map((m) => (m.id === editing.id ? { ...m, ...res.data } : m)),
        );
        showToast("success", "Membre mis à jour avec succès");
      } else {
        setMembers((p) => [res.data, ...p]);
        showToast("success", "Nouveau membre ajouté");
      }
      setView("list");
    } catch (err: any) {
      const detail = err?.response?.data
        ? JSON.stringify(err.response.data)
        : "Erreur inconnue";
      showToast("error", detail.substring(0, 120));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (m: any) => {
    try {
      await API.delete(`/admin/team/${m.id}/`);
      setMembers((p) => p.filter((x) => x.id !== m.id));
      showToast("success", `${m.name} supprimé`);
      if (view === "form") setView("list");
    } catch {
      showToast("error", "Erreur lors de la suppression");
    }
    setConfirmDelete(null);
  };

  const toggleActive = async (m: any) => {
    try {
      await API.patch(`/admin/team/${m.id}/`, { is_active: !m.is_active });
      setMembers((p) =>
        p.map((x) => (x.id === m.id ? { ...x, is_active: !x.is_active } : x)),
      );
      showToast("success", m.is_active ? "Membre désactivé" : "Membre activé");
    } catch {
      showToast("error", "Erreur");
    }
  };

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  // ── FORM VIEW ──────────────────────────────────────────
  if (view === "form")
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setView("list")} className="btn-ghost p-1.5">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-white">
              {editing ? `Modifier ${editing.name}` : "Nouveau membre"}
            </h1>
            <p className="text-xs text-white/50">
              {editing
                ? "Mettre à jour les informations"
                : "Ajouter un membre à l'équipe"}
            </p>
          </div>
        </div>

        <div className="space-y-2 gap-2 flex lg:grid lg:grid-cols-5 lg:grid-rows-[repeat(3,auto)]">
          {/* Photo + statut */}
          <div className="lg:flex lg:row-span-3">
            <div className="flex flex-col lg:grid lg:grid-rows-3 gap-2">
              <div className="glass-card p-1 flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-orange-500/10 border-2 border-dashed border-orange-500/30 flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera
                          size={28}
                          className="text-orange-400/50 mx-auto mb-1"
                        />
                        <p className="text-[10px] text-white/30">
                          Aucune photo
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => photoRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-400 transition"
                  >
                    <Upload size={14} className="text-white" />
                  </button>
                  <input
                    ref={photoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">
                    {form.name || "Nom du membre"}
                  </p>
                  <p className="text-xs text-white/50">{form.role || "Rôle"}</p>
                </div>
              </div>

              {/* stat */}
              <div className="glass-card p-4 space-y-3">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Statut
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">
                    Visible sur le site
                  </span>
                  <button
                    onClick={() => set("is_active", !form.is_active)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active ? "bg-orange-500" : "bg-white/10"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_active ? "translate-x-5" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => set("order", parseInt(e.target.value))}
                    className="input-dark"
                    min={0}
                    max={99}
                  />
                </div>
              </div>

              {/* contact */}
              <div className="glass-card p-5 space-y-3">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Contact
                </p>
                <div className="grid sm:grid-rows-2 gap-3">
                  <div>
                    <label className="text-xs text-white/50 block mb-1.5 flex items-center gap-1">
                      <Phone size={10} />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="input-dark"
                      placeholder="04 91 33 50 00"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1.5 flex items-center gap-1">
                      <Mail size={10} />
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="input-dark"
                      placeholder="contact@borgel.fr"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Infos principales */}
          <div className="flex flex-col lg:col-span-4">
            <div className="glass-card p-5 space-y-4 ">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Informations
              </p>
              <div className="flex lg:gap-[2%] xl:gap-20 flex-wrap">
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="input-dark"
                    placeholder="Maître Borgel"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 block mb-1.5">
                    Rôle *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    className="input-dark bg-black/10 appearance-none pr-8"
                  >
                    <option value="" className="text-black">
                      Sélectionner un rôle
                    </option>
                    {ROLES.map((r) => (
                      <option key={r} value={r} className="bg-white text-black">
                        {r}
                      </option>
                    ))}
                    <option value="custom" className="text-black">
                      Autre (saisir ci-dessous)
                    </option>
                  </select>
                  {form.role === "custom" && (
                    <input
                      type="text"
                      placeholder="Rôle personnalisé..."
                      className="input-dark mt-2"
                      onChange={(e) => set("role", e.target.value)}
                    />
                  )}
                </div>

                <div >
                  <label className="text-xs text-white/50 block mb-1.5 flex items-center gap-1">
                    <Phone size={10} />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="input-dark"
                    placeholder="04 91 33 50 00"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 block mb-1.5 flex items-center gap-1">
                    <Mail size={10} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="input-dark"
                    placeholder="contact@borgel.fr"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/50 block mb-1.5">
                  Biographie
                </label>
                <textarea
                  value={form.biography}
                  onChange={(e) => set("biography", e.target.value)}
                  className="input-dark min-h-[120px] resize-without transition"
                  rows={5}
                  placeholder="Parcours, spécialisations, expériences..."
                />
              </div>
            </div>
          </div>

          {/* reseau socieau */}
          
          <div className="flex lg:col-span-2">
            <div className="glass-card p-5 space-y-3">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-1">
                <Link size={11} />
                Réseaux sociaux
              </p>
              {[
                {
                  key: "linkedin",
                  placeholder: "https://linkedin.com/in/...",
                  label: "LinkedIn",
                },
                {
                  key: "twitter",
                  placeholder: "https://twitter.com/...",
                  label: "Twitter / X",
                },
                {
                  key: "facebook",
                  placeholder: "https://facebook.com/...",
                  label: "Facebook",
                },
              ].map(({ key, placeholder, label }) => (
                <div key={key}>
                  <label className="text-xs text-white/50 block mb-1">
                    {label}
                  </label>
                  <input
                    type="url"
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="input-dark"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* expertise */}
          <div className="lg:flex lg:col-span-2">
            <div className="glass-card p-5 lg:max-w-5xl">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                Expertises
              </p>
              <div className="flex flex-wrap gap-2">
                {(expertises.length > 0 ? expertises : demoExpertises).map(
                  (e: any) => (
                    <button
                      key={e.id}
                      onClick={() =>
                        setSelectedExp((p) =>
                          p.includes(e.id)
                            ? p.filter((x) => x !== e.id)
                            : [...p, e.id],
                        )
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition ${selectedExp.includes(e.id) ? "bg-orange-500/20 border-orange-500/40 text-orange-400" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"}`}
                    >
                      <span>{e.icon}</span>
                      {e.name}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* bouttons action */}
        <div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex-1 justify-center py-2.5"
            >
              <Save size={15} />
              {saving
                ? "Sauvegarde..."
                : editing
                  ? "Mettre à jour"
                  : "Ajouter le membre"}
            </button>
            {editing && (
              <button
                onClick={() => setConfirmDelete(editing)}
                className="btn-danger"
              >
                <Trash2 size={15} />
                Supprimer
              </button>
            )}
            <button onClick={() => setView("list")} className="btn-secondary">
              Annuler
            </button>
          </div>
        </div>

        {/* Confirm delete dialog */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) setConfirmDelete(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card p-6 max-w-sm mx-4 w-full"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Trash2 size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Supprimer {confirmDelete.name} ?
                    </h3>
                    <p className="text-sm text-white/60 mt-1">
                      Cette action est irréversible. Le membre sera
                      définitivement supprimé du site.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleDelete(confirmDelete)}
                    className="btn-danger"
                  >
                    <Trash2 size={13} />
                    Supprimer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

  // ── LIST VIEW ──────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Équipe</h1>
          <p className="text-sm text-white/50">
            {displayed.length} membre{displayed.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus size={15} />
          Ajouter membre
        </button>
      </div>

      <div className="relative max-w-xs">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="search"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-dark pl-8"
        />
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card h-32 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((m) => (
            <div
              key={m.id}
              className="glass-card p-4 hover:border-white/20 transition"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-orange-400">
                      {m.name[0]}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{m.name}</p>
                  <p className="text-xs text-white/50 truncate">{m.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => toggleActive(m)}>
                      {m.is_active ? (
                        <span className="badge badge-green flex items-center gap-1">
                          <CheckCircle size={9} />
                          Actif
                        </span>
                      ) : (
                        <span className="badge badge-red flex items-center gap-1">
                          <XCircle size={9} />
                          Inactif
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => openEdit(m)}
                    className="btn-ghost p-1.5"
                    title="Modifier"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(m)}
                    className="btn-ghost text-red-400 p-1.5"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm delete from list */}
      <AnimatePresence>
        {confirmDelete && view === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card p-6 max-w-sm mx-4 w-full"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Trash2 size={18} className="text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Supprimer {confirmDelete.name} ?
                  </h3>
                  <p className="text-sm text-white/60 mt-1">
                    Cette action est irréversible.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="btn-danger"
                >
                  <Trash2 size={13} />
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
