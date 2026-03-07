import { MessageSquare } from "lucide-react";

export default function Testimonials() {
  return (
    <section
      id="referenzen"
      className="bg-[#EDE8DF] border-y border-[#C9A96E]/25 py-20 lg:py-28"
    >
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-0.5 w-10 bg-[#C9A96E]" />
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#C9A96E" }}
          >
            Kundenstimmen
          </span>
          <div className="h-0.5 w-10 bg-[#C9A96E]" />
        </div>

        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ backgroundColor: "rgba(201,169,110,0.12)" }}
        >
          <MessageSquare size={28} style={{ color: "#C9A96E" }} />
        </div>

        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900 leading-[1.1] mb-4">
          Echte Kundenstimmen folgen in Kürze.
        </h2>
        <p className="text-stone-500 text-xl leading-[1.75]">
          Hier werden bald echte Erfahrungen von Kunden stehen, die ihre Immobilie erfolgreich mit Plan A Immobilien verkauft haben.
        </p>
      </div>
    </section>
  );
}
