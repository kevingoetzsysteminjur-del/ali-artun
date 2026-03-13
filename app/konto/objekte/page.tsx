"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Plus,
  Trash2,
  Save,
  X,
  Building2,
  MapPin,
  Euro,
  SquareM,
  BedDouble,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";

type Property = {
  id: string;
  title: string;
  description_de: string;
  address: string;
  price: number | null;
  area: number | null;
  rooms: number | null;
  year_built: number | null;
  property_type: string;
  status: string;
  features: string[];
  active: boolean;
  created_at: string;
};

const DEMO_DATA: Property[] = [
  {
    id: "demo-1",
    title: "Gepflegtes Einfamilienhaus in Mosbach",
    description_de:
      "Schönes Einfamilienhaus in ruhiger Wohnlage mit großem Garten. Ideal für Familien. Vollständig renoviert, neue Küche, modernes Bad.",
    address: "Neckargemünder Str. 12, 74821 Mosbach",
    price: 349000,
    area: 145,
    rooms: 5,
    year_built: 1985,
    property_type: "Haus",
    status: "verfügbar",
    features: ["Garten", "Garage", "Keller", "Renoviert 2022"],
    active: true,
    created_at: "2026-03-10T10:00:00Z",
  },
  {
    id: "demo-2",
    title: "Moderne 3-Zimmer-Wohnung Zentrum",
    description_de:
      "Helle, gut geschnittene Wohnung im Herzen von Mosbach. Balkon mit Stadtblick, EBK vorhanden.",
    address: "Hauptstr. 45, 74821 Mosbach",
    price: 198000,
    area: 78,
    rooms: 3,
    year_built: 2010,
    property_type: "Wohnung",
    status: "reserviert",
    features: ["Balkon", "Einbauküche", "Aufzug", "Tiefgarage"],
    active: true,
    created_at: "2026-03-08T14:00:00Z",
  },
  {
    id: "demo-3",
    title: "Baugrundstück Stadtrand Buchen",
    description_de:
      "Erschlossenes Grundstück in ruhiger Neubaulage. Alle Versorgungsleitungen vorhanden.",
    address: "Am Feldweg 3, 74722 Buchen",
    price: 125000,
    area: 600,
    rooms: null,
    year_built: null,
    property_type: "Grundstück",
    status: "verfügbar",
    features: ["Erschlossen", "Baureif", "Südausrichtung"],
    active: true,
    created_at: "2026-03-05T09:00:00Z",
  },
];

const STATUS_OPTIONS = [
  { value: "verfügbar", label: "Verfügbar", color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
  { value: "reserviert", label: "Reserviert", color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  { value: "verkauft", label: "Verkauft", color: "#6b7280", bg: "rgba(107,114,128,0.12)" },
];

const TYPE_OPTIONS = ["Haus", "Wohnung", "Grundstück", "Gewerbe"];

const EMPTY_PROPERTY: Omit<Property, "id" | "created_at"> = {
  title: "",
  description_de: "",
  address: "",
  price: null,
  area: null,
  rooms: null,
  year_built: null,
  property_type: "Haus",
  status: "verfügbar",
  features: [],
  active: true,
};

function formatPrice(price: number | null): string {
  if (!price) return "–";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE").format(new Date(dateStr));
}

export default function AdminObjektePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Property, "id" | "created_at">>(EMPTY_PROPERTY);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          setProperties(DEMO_DATA);
          setIsDemo(true);
        } else {
          setProperties(data);
        }
        setLoading(false);
      });
  }, []);

  const openNew = () => {
    setEditId(null);
    setFormData(EMPTY_PROPERTY);
    setFeatureInput("");
    setShowForm(true);
  };

  const openEdit = (p: Property) => {
    setEditId(p.id);
    setFormData({
      title: p.title,
      description_de: p.description_de,
      address: p.address,
      price: p.price,
      area: p.area,
      rooms: p.rooms,
      year_built: p.year_built,
      property_type: p.property_type,
      status: p.status,
      features: p.features || [],
      active: p.active,
    });
    setFeatureInput("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData(EMPTY_PROPERTY);
  };

  const addFeature = () => {
    const f = featureInput.trim();
    if (!f) return;
    setFormData((p) => ({ ...p, features: [...p.features, f] }));
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    setFormData((p) => ({ ...p, features: p.features.filter((_, i) => i !== idx) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    setSaving(true);

    if (isDemo) {
      if (editId) {
        setProperties((prev) =>
          prev.map((p) => (p.id === editId ? { ...p, ...formData } : p))
        );
      } else {
        const fake: Property = {
          id: `demo-${Date.now()}`,
          ...formData,
          created_at: new Date().toISOString(),
        };
        setProperties((prev) => [fake, ...prev]);
      }
      setSaving(false);
      closeForm();
      return;
    }

    const supabase = createClient();
    if (editId) {
      await supabase
        .from("properties")
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq("id", editId);
      setProperties((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...formData } : p))
      );
    } else {
      const { data } = await supabase
        .from("properties")
        .insert(formData)
        .select()
        .single();
      if (data) setProperties((prev) => [data, ...prev]);
    }
    setSaving(false);
    closeForm();
  };

  const toggleActive = async (id: string, active: boolean) => {
    if (isDemo) {
      setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, active } : p)));
      return;
    }
    const supabase = createClient();
    await supabase.from("properties").update({ active }).eq("id", id);
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, active } : p)));
  };

  const deleteProperty = async (id: string) => {
    if (isDemo) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("properties").delete().eq("id", id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#C5A028", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.8)",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.35)",
    marginBottom: 4,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.9)" }}
          >
            Objekte
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            {properties.length} Objekt{properties.length !== 1 ? "e" : ""} verwaltet
            {isDemo && (
              <span
                className="ml-2 px-2 py-0.5 rounded text-xs"
                style={{ background: "rgba(197,160,40,0.1)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.2)" }}
              >
                Demo-Daten
              </span>
            )}
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ background: "rgba(197,160,40,0.15)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.3)" }}
        >
          <Plus size={15} />
          Neues Objekt
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.7)" }}>
          <div
            className="w-full max-w-2xl rounded-2xl mt-10 mb-10"
            style={{ background: "#13131f", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
                {editId ? "Objekt bearbeiten" : "Neues Objekt"}
              </h2>
              <button onClick={closeForm} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Titel */}
              <div>
                <label style={labelStyle}>Titel *</label>
                <input
                  style={inputStyle}
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="z.B. Gepflegtes Einfamilienhaus in Mosbach"
                  required
                />
              </div>

              {/* Type + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Objekttyp</label>
                  <select
                    style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.property_type}
                    onChange={(e) => setFormData((p) => ({ ...p, property_type: e.target.value }))}
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t} style={{ background: "#13131f" }}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select
                    style={{ ...inputStyle, cursor: "pointer" }}
                    value={formData.status}
                    onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value} style={{ background: "#13131f" }}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={labelStyle}>Adresse</label>
                <input
                  style={inputStyle}
                  value={formData.address}
                  onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Straße, PLZ Ort"
                />
              </div>

              {/* Price + Area + Rooms + Year */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label style={labelStyle}>Preis (€)</label>
                  <input
                    type="number"
                    style={inputStyle}
                    value={formData.price ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value ? Number(e.target.value) : null }))}
                    placeholder="z.B. 349000"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Fläche (m²)</label>
                  <input
                    type="number"
                    style={inputStyle}
                    value={formData.area ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, area: e.target.value ? Number(e.target.value) : null }))}
                    placeholder="z.B. 145"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Zimmer</label>
                  <input
                    type="number"
                    style={inputStyle}
                    value={formData.rooms ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, rooms: e.target.value ? Number(e.target.value) : null }))}
                    placeholder="z.B. 5"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Baujahr</label>
                  <input
                    type="number"
                    style={inputStyle}
                    value={formData.year_built ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, year_built: e.target.value ? Number(e.target.value) : null }))}
                    placeholder="z.B. 1985"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Beschreibung</label>
                <textarea
                  style={{ ...inputStyle, resize: "none" }}
                  rows={3}
                  value={formData.description_de}
                  onChange={(e) => setFormData((p) => ({ ...p, description_de: e.target.value }))}
                  placeholder="Objektbeschreibung..."
                />
              </div>

              {/* Features */}
              <div>
                <label style={labelStyle}>Ausstattungsmerkmale</label>
                <div className="flex gap-2 mb-2">
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="z.B. Garage, Garten..."
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{ background: "rgba(197,160,40,0.15)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.3)", cursor: "pointer", flexShrink: 0 }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {formData.features.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                        style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        {f}
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, lineHeight: 1 }}
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Active toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData((p) => ({ ...p, active: e.target.checked }))}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#C5A028" }}
                />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Objekt auf Website anzeigen</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)", color: "#fff", border: "none", cursor: saving ? "not-allowed" : "pointer" }}
                >
                  <Save size={15} />
                  {saving ? "Speichert..." : editId ? "Aktualisieren" : "Objekt anlegen"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 rounded-lg text-sm"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Property list */}
      <div className="space-y-3">
        {properties.map((p) => {
          const statusCfg = STATUS_OPTIONS.find((s) => s.value === p.status) || STATUS_OPTIONS[0];
          return (
            <div
              key={p.id}
              className="rounded-xl p-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: p.active ? 1 : 0.55,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {p.title}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}
                    >
                      {statusCfg.label}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}
                    >
                      {p.property_type}
                    </span>
                  </div>

                  {p.address && (
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin size={11} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{p.address}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {p.price && (
                      <div className="flex items-center gap-1">
                        <Euro size={12} style={{ color: "#C5A028" }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#C5A028" }}>{formatPrice(p.price)}</span>
                      </div>
                    )}
                    {p.area && (
                      <div className="flex items-center gap-1">
                        <SquareM size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{p.area} m²</span>
                      </div>
                    )}
                    {p.rooms && (
                      <div className="flex items-center gap-1">
                        <BedDouble size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{p.rooms} Zimmer</span>
                      </div>
                    )}
                    {p.year_built && (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>BJ {p.year_built}</span>
                      </div>
                    )}
                  </div>

                  {p.features && p.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.features.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>
                    Eingestellt: {formatDate(p.created_at)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(p.id, !p.active)}
                    title={p.active ? "Deaktivieren" : "Aktivieren"}
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: p.active ? "#C5A028" : "rgba(255,255,255,0.25)" }}
                  >
                    {p.active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)" }}
                  >
                    <Building2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteProperty(p.id)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-red-500/10"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)" }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {properties.length === 0 && (
          <div className="text-center py-12" style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>
            Noch keine Objekte. Fügen Sie Ihr erstes Objekt hinzu.
          </div>
        )}
      </div>
    </div>
  );
}
