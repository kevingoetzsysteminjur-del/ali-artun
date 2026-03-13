"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { Upload, Trash2, ImageIcon } from "lucide-react";

type SiteImage = {
  id: string;
  storage_path: string;
  public_url: string;
  section: string;
  label: string | null;
  created_at: string;
};

const SECTIONS = [
  { value: "hero", label: "Hero" },
  { value: "ueber-mich", label: "Über mich" },
  { value: "objekte", label: "Objekte" },
  { value: "galerie", label: "Galerie" },
  { value: "referenzen", label: "Referenzen" },
];

const DEMO_IMAGES: SiteImage[] = [
  {
    id: "d1",
    storage_path: "",
    public_url: "",
    section: "hero",
    label: "Hero Hintergrundbild",
    created_at: "2026-03-10T10:00:00Z",
  },
  {
    id: "d2",
    storage_path: "",
    public_url: "",
    section: "ueber-mich",
    label: "Profilbild Ali",
    created_at: "2026-03-09T10:00:00Z",
  },
  {
    id: "d3",
    storage_path: "",
    public_url: "",
    section: "galerie",
    label: "Referenzobjekt 1",
    created_at: "2026-03-08T10:00:00Z",
  },
  {
    id: "d4",
    storage_path: "",
    public_url: "",
    section: "galerie",
    label: "Referenzobjekt 2",
    created_at: "2026-03-07T10:00:00Z",
  },
];

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AdminBilderPage() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("hero");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      setImages(DEMO_IMAGES);
      setIsDemo(true);
    } else {
      setImages(data);
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Nur Bilddateien werden unterstützt.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    const supabase = createClient();

    const ext = file.name.split(".").pop();
    const path = `${selectedSection}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(path, file);

    if (uploadError) {
      setUploadError("Upload fehlgeschlagen: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(path);

    const { error: dbError } = await supabase.from("site_images").insert({
      storage_path: path,
      public_url: urlData.publicUrl,
      section: selectedSection,
      label: file.name.replace(/\.[^/.]+$/, ""),
    });

    if (dbError) {
      setUploadError("Datenbankfehler: " + dbError.message);
    } else {
      await loadImages();
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (image: SiteImage) => {
    if (!confirm("Bild wirklich löschen?")) return;
    setDeletingId(image.id);
    const supabase = createClient();

    if (image.storage_path) {
      await supabase.storage.from("images").remove([image.storage_path]);
    }
    await supabase.from("site_images").delete().eq("id", image.id);

    setImages((prev) => prev.filter((img) => img.id !== image.id));
    setDeletingId(null);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Bilder
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            Website-Bilder verwalten und hochladen
            {isDemo && (
              <span
                className="ml-2 px-2 py-0.5 rounded text-xs"
                style={{
                  background: "rgba(197,160,40,0.1)",
                  color: "#C5A028",
                  border: "1px solid rgba(197,160,40,0.2)",
                }}
              >
                Demo-Ansicht
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Upload zone */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(197,160,40,0.3)",
        }}
      >
        <h2
          className="text-sm font-semibold mb-4"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Bild hochladen
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label
              className="text-xs mb-1 block"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Bereich
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="rounded-lg px-3 py-2 text-sm focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {SECTIONS.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                  style={{ background: "#1a1a2e" }}
                >
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-xs mb-1 block"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Datei auswählen
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all"
              style={{
                background: uploading
                  ? "rgba(197,160,40,0.1)"
                  : "rgba(197,160,40,0.15)",
                color: uploading ? "rgba(197,160,40,0.5)" : "#C5A028",
                border: "1px solid rgba(197,160,40,0.3)",
                cursor: uploading ? "not-allowed" : "pointer",
              }}
            >
              <Upload size={15} />
              {uploading ? "Wird hochgeladen..." : "Bild hochladen"}
            </label>
          </div>
        </div>

        {uploadError && (
          <p className="mt-3 text-sm text-red-400">{uploadError}</p>
        )}
        {isDemo && (
          <p
            className="mt-3 text-xs"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Hinweis: Upload ist im Demo-Modus nicht verfügbar. Verbinden Sie
            Supabase um Bilder hochzuladen.
          </p>
        )}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => {
          const sectionLabel =
            SECTIONS.find((s) => s.value === image.section)?.label ||
            image.section;

          return (
            <div
              key={image.id}
              className="group relative rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Image preview */}
              <div
                className="relative w-full flex items-center justify-center"
                style={{ height: 140, background: "rgba(255,255,255,0.03)" }}
              >
                {image.public_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.public_url}
                    alt={image.label || "Bild"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={32}
                    style={{ color: "rgba(255,255,255,0.1)" }}
                  />
                )}

                {/* Delete button */}
                {!isDemo && (
                  <button
                    onClick={() => handleDelete(image)}
                    disabled={deletingId === image.id}
                    className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    style={{
                      background: "rgba(239,68,68,0.9)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={13} style={{ color: "#fff" }} />
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                <p
                  className="text-xs font-medium truncate"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {image.label || "Ohne Titel"}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(197,160,40,0.1)",
                      color: "#C5A028",
                      fontSize: 10,
                    }}
                  >
                    {sectionLabel}
                  </span>
                  <span
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}
                  >
                    {formatDate(image.created_at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
