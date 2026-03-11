export default function GoogleReviewsWidget() {
  return (
    <div className="bg-white rounded-3xl border border-[#C5A028]/20 shadow-sm overflow-hidden max-w-sm w-full mx-auto">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05]" />

      <div className="p-7 text-center">
        {/* Google Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" aria-label="Google" role="img">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-stone-700 font-semibold text-base">Google Bewertungen</span>
        </div>

        {/* Sterne + Zahl */}
        <div className="mb-1">
          <p className="text-5xl font-bold text-stone-900 leading-none mb-2">5,0</p>
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="22" height="22" viewBox="0 0 24 24" fill="#C5A028" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <p className="text-stone-400 text-sm">Google Business Profil</p>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-stone-100" />

        {/* Status */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-3 mb-5">
          <p className="text-amber-700 text-sm font-medium mb-0.5">Profil wird eingerichtet</p>
          <p className="text-amber-600 text-xs leading-relaxed">
            Das Google Business Profil ist in Kürze verfügbar. Bewertungen folgen nach Freischaltung.
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://www.google.com/maps/search/Plan+A+Immobilien+Mosbach"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all border border-[#4285F4]/30 text-[#4285F4] hover:bg-[#4285F4]/5"
          style={{ textDecoration: "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Auf Google suchen &amp; bewerten
        </a>
      </div>
    </div>
  );
}
