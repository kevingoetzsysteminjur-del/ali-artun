"use client";
import { useState, useMemo } from "react";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ZEITSLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const WOCHENTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

function getWorkdays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatDay(d: Date) {
  return `${d.getDate()}. ${MONATE[d.getMonth()]}`;
}

export default function TerminClient() {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", topic: "" });
  const [submitted, setSubmitted] = useState(false);

  const workdays = useMemo(() => getWorkdays(15), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Terminanfrage:", {
      datum: selectedDate?.toLocaleDateString("de-DE"),
      uhrzeit: selectedTime,
      ...form,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#C5A028]/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} style={{ color: "#C5A028" }} />
          </div>
          <h2 className="font-heading text-3xl font-bold text-stone-900 mb-3">{t("booking.confirmTitle")}</h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-8">{t("booking.confirmText")}</p>
          <button
            onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedTime(null); setForm({ name: "", phone: "", email: "", topic: "" }); }}
            className="btn-secondary"
          >
            <ChevronLeft size={14} />
            Neuen Termin anfragen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-0.5 w-10 bg-[#C5A028]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">Terminbuchung</span>
          <div className="h-0.5 w-10 bg-[#C5A028]" />
        </div>
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-4">{t("booking.title")}</h1>
        <p className="text-stone-500 text-xl max-w-xl mx-auto">{t("booking.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kalender */}
        <div className="bg-white rounded-3xl border border-[#C5A028]/15 p-6 shadow-sm">
          <h3 className="font-heading text-lg font-semibold text-stone-900 mb-5">{t("booking.selectDate")}</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {workdays.map((d, i) => {
              const isSelected = selectedDate?.toDateString() === d.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                  className={`py-3 px-2 rounded-xl text-center transition-all border text-sm ${
                    isSelected
                      ? "bg-[#C5A028] text-white border-[#C5A028] shadow-md"
                      : "border-stone-200 hover:border-[#C5A028]/50 hover:bg-[#C5A028]/5"
                  }`}
                >
                  <p className={`text-[10px] font-medium mb-0.5 ${isSelected ? "text-white/80" : "text-stone-400"}`}>
                    {WOCHENTAGE[d.getDay()]}
                  </p>
                  <p className={`font-semibold ${isSelected ? "text-white" : "text-stone-700"}`}>
                    {d.getDate()}.
                  </p>
                  <p className={`text-[10px] ${isSelected ? "text-white/80" : "text-stone-400"}`}>
                    {MONATE[d.getMonth()]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Zeitslots */}
          {selectedDate && (
            <div className="mt-6 pt-5 border-t border-stone-100">
              <h4 className="text-stone-600 text-sm font-medium mb-3">{t("booking.selectTime")} – {formatDay(selectedDate)}</h4>
              <div className="grid grid-cols-3 gap-2">
                {ZEITSLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      selectedTime === time
                        ? "bg-[#C5A028] text-white border-[#C5A028]"
                        : "border-stone-200 hover:border-[#C5A028]/50 text-stone-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Formular */}
        <div className="bg-white rounded-3xl border border-[#C5A028]/15 p-6 shadow-sm">
          <h3 className="font-heading text-lg font-semibold text-stone-900 mb-5">Ihre Angaben</h3>

          {selectedDate && selectedTime ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ausgewählter Termin */}
              <div className="bg-[#C5A028]/8 border border-[#C5A028]/25 rounded-xl px-4 py-3 mb-5">
                <p className="text-[#C5A028] text-xs font-semibold uppercase tracking-wide mb-0.5">Ihr Termin</p>
                <p className="text-stone-800 font-medium">
                  {selectedDate.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })} · {selectedTime} Uhr
                </p>
              </div>

              <div>
                <label className="block text-stone-600 text-sm font-medium mb-1.5">{t("booking.name")} *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#C5A028]/25 rounded-xl px-4 py-3 text-stone-900 bg-white focus:outline-none focus:border-[#C5A028] focus:ring-2 focus:ring-[#C5A028]/20 text-sm transition-all"
                  placeholder="Max Mustermann"
                />
              </div>
              <div>
                <label className="block text-stone-600 text-sm font-medium mb-1.5">{t("booking.phone")} *</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#C5A028]/25 rounded-xl px-4 py-3 text-stone-900 bg-white focus:outline-none focus:border-[#C5A028] focus:ring-2 focus:ring-[#C5A028]/20 text-sm transition-all"
                  placeholder="+49 6261 ..."
                />
              </div>
              <div>
                <label className="block text-stone-600 text-sm font-medium mb-1.5">{t("booking.email")}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[#C5A028]/25 rounded-xl px-4 py-3 text-stone-900 bg-white focus:outline-none focus:border-[#C5A028] focus:ring-2 focus:ring-[#C5A028]/20 text-sm transition-all"
                  placeholder="max@beispiel.de"
                />
              </div>
              <div>
                <label className="block text-stone-600 text-sm font-medium mb-1.5">{t("booking.topic")} *</label>
                <select
                  required
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full border border-[#C5A028]/25 rounded-xl px-4 py-3 text-stone-900 bg-white focus:outline-none focus:border-[#C5A028] focus:ring-2 focus:ring-[#C5A028]/20 text-sm transition-all"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="verkauf">{t("booking.topic1")}</option>
                  <option value="bewertung">{t("booking.topic2")}</option>
                  <option value="finanzierung">{t("booking.topic3")}</option>
                  <option value="beratung">{t("booking.topic4")}</option>
                  <option value="sonstiges">{t("booking.topic5")}</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full justify-center mt-2">
                {t("booking.submit")}
                <span className="btn-arrow">→</span>
              </button>
              <p className="text-stone-400 text-xs text-center">{t("booking.note")}</p>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="w-14 h-14 rounded-full bg-[#EDE8DF] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A028" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
              </div>
              <p className="text-stone-500 text-sm">Wählen Sie zuerst ein Datum und eine Uhrzeit aus.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <p className="text-stone-400 text-sm">
          Lieber direkt anrufen?{" "}
          <a href="tel:+4962611234560" className="text-[#C5A028] font-medium hover:underline">
            06261 / 123 456
          </a>
        </p>
      </div>
    </div>
  );
}
