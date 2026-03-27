"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Phone,
      label: t("contact.method1_label"),
      value: t("contact.method1_value"),
      sub: t("contact.method1_sub"),
      href: "tel:+491736259429",
    },
    {
      icon: MessageCircle,
      label: t("contact.method2_label"),
      value: t("contact.method2_value"),
      sub: t("contact.method2_sub"),
      href: "https://wa.me/491736259429",
    },
    {
      icon: Mail,
      label: t("contact.method3_label"),
      value: t("contact.method3_value"),
      sub: t("contact.method3_sub"),
      href: "mailto:Info@plana-immobilien-finanzierung.com",
    },
    {
      icon: MapPin,
      label: t("contact.method4_label"),
      value: t("contact.method4_value"),
      sub: t("contact.method4_sub"),
      href: "#",
    },
  ];

  return (
    <section id="kontakt" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-0.5 w-10 bg-[#C5A028]" />
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#C5A028" }}
                >
                  {t("contact.label")}
                </span>
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-5">
                {t("contact.heading")}
              </h2>
              <p className="text-stone-600 text-xl leading-[1.75]">
                {t("contact.sub")}
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[#C5A028]/20 hover:border-[#C5A028]/50 hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(197,160,40,0.1)" }}
                    >
                      <Icon size={20} style={{ color: "#C5A028" }} />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-stone-900 font-semibold text-lg leading-tight">
                        {item.value}
                      </p>
                      <p className="text-stone-400 text-sm">{item.sub}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-[#C5A028]/25 shadow-md shadow-[#C5A028]/5">
            <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
              {t("contact.formTitle")}
            </h3>
            <p className="text-stone-500 text-base mb-8">
              {t("contact.formSub")}
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    {t("contact.firstName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("contact.firstNamePH")}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    {t("contact.lastName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("contact.lastNamePH")}
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  placeholder={t("contact.phonePH")}
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  placeholder={t("contact.emailPH")}
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  {t("contact.propertyType")}
                </label>
                <select className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all appearance-none cursor-pointer">
                  <option value="">{t("contact.propertyTypePH")}</option>
                  <option value="haus">{t("contact.pt1")}</option>
                  <option value="wohnung">{t("contact.pt2")}</option>
                  <option value="grundstueck">{t("contact.pt3")}</option>
                  <option value="sonstiges">{t("contact.pt4")}</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("contact.messagePH")}
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                {t("contact.submit")}
                <span className="btn-arrow">→</span>
              </button>

              <p className="text-stone-400 text-sm text-center leading-relaxed">
                {t("contact.privacyNote")}{" "}
                <a href="/datenschutz" className="underline hover:text-[#C5A028]">
                  {t("contact.privacyLink")}
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-[#C5A028]/20 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41882.48!2d9.1125!3d49.3523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47985c3d57b8f1af%3A0x5cd56f1dc7e3a24c!2sMosbach!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
            width="100%"
            height="300"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("contact.mapTitle")}
          />
        </div>
      </div>
    </section>
  );
}
