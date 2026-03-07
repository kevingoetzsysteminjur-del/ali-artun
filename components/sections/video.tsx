export default function Video() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Lernen Sie uns kennen
          </h2>
          <p className="text-stone-500 text-xl leading-[1.75]">
            Erfahren Sie, wie wir Immobilienverkauf und Finanzierung zu einem sicheren Abschluss führen.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            paddingTop: "56.25%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/HxJ_R-bG22Q"
            title="Plan A Immobilien & Finanzierung"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
