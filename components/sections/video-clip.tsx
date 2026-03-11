export default function VideoClip() {
  return (
    <section className="bg-[#FAF8F4] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Einblick
          </p>
          <h2 className="font-heading text-3xl font-bold text-stone-900">
            Plan A in Aktion
          </h2>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 12,
            boxShadow: "0 8px 48px rgba(197,160,40,0.12), 0 2px 16px rgba(0,0,0,0.06)",
            border: "1px solid rgba(197,160,40,0.18)",
          }}
        >
          <video
            src="/images/video.mp4"
            controls
            playsInline
            style={{ width: "100%", display: "block", borderRadius: 10 }}
          />
        </div>
      </div>
    </section>
  );
}
