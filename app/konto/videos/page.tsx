"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Trash2, GripVertical, ExternalLink, Eye, EyeOff, Save } from "lucide-react";

type VideoTestimonial = {
  id: string;
  title_de: string;
  title_en: string;
  title_tr: string;
  description_de: string;
  youtube_url: string;
  active: boolean;
  sort_order: number;
};

const DEMO_DATA: VideoTestimonial[] = [
  {
    id: "demo-1",
    title_de: "Erfolgreicher Verkauf in Mosbach",
    title_en: "Successful Sale in Mosbach",
    title_tr: "Mosbach'ta Başarılı Satış",
    description_de: "Herr Köhler hat mit unserer Hilfe sein Einfamilienhaus in kürzester Zeit zum Bestpreis verkauft.",
    youtube_url: "https://www.youtube.com/watch?v=TY9aF0GQq-U",
    active: true,
    sort_order: 0,
  },
  {
    id: "demo-2",
    title_de: "Traumwohnung gefunden & finanziert",
    title_en: "Dream Apartment Found & Financed",
    title_tr: "Hayalindeki Daire Bulundu & Finanse Edildi",
    description_de: "Familie Meier konnte dank geprüfter Finanzierung innerhalb von 6 Wochen einziehen.",
    youtube_url: "",
    active: true,
    sort_order: 1,
  },
  {
    id: "demo-3",
    title_de: "Kundenstimme: Komplettservice",
    title_en: "Client Testimonial: Full Service",
    title_tr: "Müşteri Yorumu: Tam Hizmet",
    description_de: "Von der Erstberatung bis zum Notartermin – alles aus einer Hand.",
    youtube_url: "",
    active: false,
    sort_order: 2,
  },
];

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<VideoTestimonial>>({});
  const [addingNew, setAddingNew] = useState(false);
  const [newVideo, setNewVideo] = useState<Omit<VideoTestimonial, "id" | "sort_order">>({
    title_de: "",
    title_en: "",
    title_tr: "",
    description_de: "",
    youtube_url: "",
    active: true,
  });

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("video_testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          setVideos(DEMO_DATA);
          setIsDemo(true);
        } else {
          setVideos(data);
        }
        setLoading(false);
      });
  }, []);

  const startEdit = (video: VideoTestimonial) => {
    setEditId(video.id);
    setEditData({ ...video });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editId || isDemo) {
      setVideos((prev) =>
        prev.map((v) => (v.id === editId ? { ...v, ...editData } : v))
      );
      cancelEdit();
      return;
    }
    setSaving(editId);
    const supabase = createClient();
    await supabase
      .from("video_testimonials")
      .update({ ...editData, updated_at: new Date().toISOString() })
      .eq("id", editId);
    setVideos((prev) =>
      prev.map((v) => (v.id === editId ? { ...v, ...editData } : v))
    );
    setSaving(null);
    cancelEdit();
  };

  const toggleActive = async (id: string, active: boolean) => {
    if (isDemo) {
      setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, active } : v)));
      return;
    }
    const supabase = createClient();
    await supabase.from("video_testimonials").update({ active }).eq("id", id);
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, active } : v)));
  };

  const deleteVideo = async (id: string) => {
    if (isDemo) {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      return;
    }
    const supabase = createClient();
    await supabase.from("video_testimonials").delete().eq("id", id);
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const addVideo = async () => {
    if (!newVideo.title_de) return;
    if (isDemo) {
      const fake: VideoTestimonial = {
        id: `demo-${Date.now()}`,
        ...newVideo,
        sort_order: videos.length,
      };
      setVideos((prev) => [...prev, fake]);
      setAddingNew(false);
      setNewVideo({ title_de: "", title_en: "", title_tr: "", description_de: "", youtube_url: "", active: true });
      return;
    }
    const supabase = createClient();
    const { data } = await supabase
      .from("video_testimonials")
      .insert({ ...newVideo, sort_order: videos.length })
      .select()
      .single();
    if (data) setVideos((prev) => [...prev, data]);
    setAddingNew(false);
    setNewVideo({ title_de: "", title_en: "", title_tr: "", description_de: "", youtube_url: "", active: true });
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
    padding: "6px 10px",
    fontSize: 13,
    width: "100%",
    outline: "none",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.9)" }}
          >
            Video-Testimonials
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            YouTube-Videos für die Website verwalten
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
          onClick={() => setAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ background: "rgba(197,160,40,0.15)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.3)" }}
        >
          <Plus size={15} />
          Neues Video
        </button>
      </div>

      {/* Add new form */}
      {addingNew && (
        <div
          className="rounded-xl p-5 mb-4"
          style={{ background: "rgba(197,160,40,0.06)", border: "1px solid rgba(197,160,40,0.2)" }}
        >
          <p className="text-sm font-medium mb-4" style={{ color: "#C5A028" }}>Neues Video hinzufügen</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Titel (DE) *</label>
              <input
                style={inputStyle}
                value={newVideo.title_de}
                onChange={(e) => setNewVideo((p) => ({ ...p, title_de: e.target.value }))}
                placeholder="z.B. Erfolgreicher Verkauf in Mosbach"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>YouTube-URL</label>
              <input
                style={inputStyle}
                value={newVideo.youtube_url}
                onChange={(e) => setNewVideo((p) => ({ ...p, youtube_url: e.target.value }))}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Titel (EN)</label>
              <input
                style={inputStyle}
                value={newVideo.title_en}
                onChange={(e) => setNewVideo((p) => ({ ...p, title_en: e.target.value }))}
                placeholder="English title"
              />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Titel (TR)</label>
              <input
                style={inputStyle}
                value={newVideo.title_tr}
                onChange={(e) => setNewVideo((p) => ({ ...p, title_tr: e.target.value }))}
                placeholder="Türkçe başlık"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Beschreibung (DE)</label>
              <textarea
                style={{ ...inputStyle, resize: "none" }}
                rows={2}
                value={newVideo.description_de}
                onChange={(e) => setNewVideo((p) => ({ ...p, description_de: e.target.value }))}
                placeholder="Kurze Beschreibung..."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addVideo}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)", color: "#fff", border: "none", cursor: "pointer" }}
            >
              <Save size={14} />
              Speichern
            </button>
            <button
              onClick={() => setAddingNew(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Video list */}
      <div className="space-y-3">
        {videos.map((video) => {
          const ytId = getYouTubeId(video.youtube_url);
          const isEditing = editId === video.id;

          return (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${video.active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                opacity: video.active ? 1 : 0.5,
              }}
            >
              {!isEditing ? (
                <div className="flex items-start gap-4 p-4">
                  <div className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.15)" }}>
                    <GripVertical size={16} />
                  </div>

                  {/* Thumbnail */}
                  <div
                    className="flex-shrink-0 w-24 h-14 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {ytId ? (
                      <img
                        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Kein Video</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {video.title_de || "Kein Titel"}
                    </p>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {video.description_de || "–"}
                    </p>
                    {video.youtube_url && (
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs"
                        style={{ color: "#C5A028", textDecoration: "none" }}
                      >
                        <ExternalLink size={11} />
                        YouTube öffnen
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => toggleActive(video.id, !video.active)}
                      title={video.active ? "Deaktivieren" : "Aktivieren"}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: video.active ? "#C5A028" : "rgba(255,255,255,0.3)" }}
                    >
                      {video.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => startEdit(video)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)" }}
                    >
                      <Save size={14} />
                    </button>
                    <button
                      onClick={() => deleteVideo(video.id)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-red-500/10"
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-xs font-medium mb-3" style={{ color: "#C5A028" }}>Bearbeiten</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Titel (DE)</label>
                      <input
                        style={inputStyle}
                        value={editData.title_de ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, title_de: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>YouTube-URL</label>
                      <input
                        style={inputStyle}
                        value={editData.youtube_url ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, youtube_url: e.target.value }))}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Titel (EN)</label>
                      <input
                        style={inputStyle}
                        value={editData.title_en ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, title_en: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Titel (TR)</label>
                      <input
                        style={inputStyle}
                        value={editData.title_tr ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, title_tr: e.target.value }))}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Beschreibung (DE)</label>
                      <textarea
                        style={{ ...inputStyle, resize: "none" }}
                        rows={2}
                        value={editData.description_de ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, description_de: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      disabled={saving === editId}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)", color: "#fff", border: "none", cursor: "pointer" }}
                    >
                      <Save size={14} />
                      {saving === editId ? "Speichert..." : "Speichern"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 rounded-lg text-sm"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {videos.length === 0 && (
          <div className="text-center py-12" style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>
            Noch keine Videos. Fügen Sie Ihr erstes Video-Testimonial hinzu.
          </div>
        )}
      </div>
    </div>
  );
}
