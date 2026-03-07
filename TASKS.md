# Plan A Immobilien – Aufgaben & Roadmap

Basierend auf: Businessplan Plan A Immobilien & Finanzierung + PRD v1.0 (Trinity Agency)
Inhaber: Ali Artun · Standort: Mosbach, Neckar-Odenwald-Kreis
Claim: „Entscheidungen auf einem anderen Niveau."

---

## Legende
- `[ ]` offen
- `[x]` erledigt
- `[~]` in Arbeit
- **P0** = Must-have für Launch | **P1** = Innerhalb 30 Tage nach Launch | **P2** = Strategisch / spätere Phase

---

## Phase 1 – Launch-Website (P0)

### Startseite (öffentliche Website)
- [x] Hero Section: Claim, Headline, CTA, Ali-Foto (W-01)
- [x] Problem / Lösung: 3–4 USP-Karten (geprüfte Käuferfinanzierung etc.) (W-02)
- [x] Prozessablauf: Schritte Erstgespräch → Bewertung → Vermarktung → Käuferprüfung → Notartermin (W-03)
- [x] Leistungen: Immobilienverkauf, Bewertung, Käuferfinanzierung, Begleitung (W-03)
- [x] Über Ali Artun (W-06)
- [x] Kundenstimmen / Referenzen (W-06)
- [x] Kontaktformular mit Anfragetyp (Haus/Wohnung/Grundstück) (W-04)
- [x] Kontaktdaten (Telefon, WhatsApp, E-Mail, Standort Mosbach) (W-04)
- [x] Navigation: Logo, Links, Telefonnummer, CTA-Button (W-01)
- [x] Footer: Links, Kontakt, Impressum/Datenschutz (W-07)
- [ ] **Terminbuchungs-Widget einbauen** (selbst gehostet, 15 Min / 60 Min Slots, Kalender-Sync) (W-04)
- [ ] **SEO-Foundation**: Meta Tags, LocalBusiness + RealEstateAgent Structured Data, Sitemap, robots.txt (W-05)
- [ ] **Ziel-Keyword**: „Immobilie verkaufen Mosbach" in Title, H1, Meta Description
- [ ] **Rechtliche Seiten**: Impressum, Datenschutzerklärung, AGB (DSGVO-konform) (W-07)
- [ ] Cookie-Consent-Banner einbauen (W-07)

### Immobiliendatenbank & Listings
- [ ] **Datenmodell definieren**: Adresse, Typ (Haus/Wohnung/MFH/Grundstück), m², Zimmer, Baujahr, Energieklasse, Preis (oder „auf Anfrage"), Status (Entwurf/Aktiv/Reserviert/Verkauft), Galerie, Dokumente, GPS, Beschreibung (PD-01)
- [ ] **Öffentliche Listenansicht**: filterbares Immobilien-Grid (Typ, Preis, Lage, Größe), Card-Layout mit Bild, Kennzahlen, Statusbadge (PD-02)
- [ ] **Immobilien-Detailseite**: Galerie (Lightbox), Eckdaten, Beschreibung, Karte (OpenStreetMap), Energiedaten, Grundriss, Exposé-Download (nur nach Kontaktdatenangabe) (PD-03)
- [ ] **Admin: Immobilien-CRUD**: Erstellen/Lesen/Bearbeiten/Löschen, Bild-Upload (Drag & Drop, Auto-Resize), Rich-Text-Beschreibung, Status-Workflow (PD-04)

### Verkäufer-Einreichungsportal
- [ ] **Mehrstufiges Einreichungsformular**: (1) Objekttyp & Lage, (2) Eckdaten (Größe, Zimmer, Baujahr, Zustand), (3) Verkaufsmotivation & Zeitrahmen, (4) Kontaktdaten + Fortschrittsanzeige (PS-01)
- [ ] **Foto-Upload** im Formular: bis 10 Fotos, clientseitige Komprimierung, Drag & Drop, Vorschau (PS-02)
- [ ] **Automatische Bestätigungs-E-Mail** mit Zusammenfassung und nächsten Schritten (Rückmeldung innerhalb 48h) (PS-04)
- [ ] **Spam-Schutz**: Honeypot + Rate Limiting (kein CAPTCHA – Premium UX) (PS-06)

### Käufer-Anfrage-System
- [ ] **Immobilien-Anfrage-CTA** auf jeder Detailseite: Name, E-Mail, Telefon, Nachricht, Budgetrahmen, Finanzierungsstatus (vorab genehmigt / in Bearbeitung / nicht begonnen) (BA-01)
- [ ] **Finanzierungs-Vorab-Check**: strukturiertes digitales Formular (Beschäftigungsart, Einkommensbereich, Eigenkapital, Verbindlichkeiten, Zeitrahmen) (BA-02, BA-03)
- [ ] **Automatische Bestätigungs-E-Mail** an Käufer mit Objektzusammenfassung (BA-05)

### Dokument-Upload & Checklisten
- [ ] **Verkäufer-Checkliste**: Grundbuchauszug, Energieausweis, Wohnflächenberechnung, Teilungserklärung etc. – Status je Dokument (PS-03, D-01)
- [ ] **Käufer-Checkliste**: Einkommensnachweise, Kontoauszüge, Ausweis, Arbeitsvertrag, SCHUFA-Einwilligung (D-02)
- [ ] **Sicheres Upload-Portal**: authentifizierter Bereich, Drag & Drop, verschlüsselt, rollenbasierter Zugriff (D-03)
- [ ] **Admin-Prüfung**: Review, Freigabe, Rückforderung, Annotation, Benachrichtigung (D-04)

### Bewertungen & Social Proof
- [ ] Google Reviews Integration oder direkte Verlinkung auf Google-Profil (R-01, R-04)
- [ ] Bewertungskarten: Name/Initialen, Text, Datum, Sterne (R-01)

---

## Phase 2 – Post-Launch (P1, innerhalb 30 Tage)

### Website-Erweiterungen
- [ ] **Blog / Content Hub**: SEO-Artikel zu Immobilienverkauf, Finanzierung, Markttrends (Markdown-CMS) (W-08)
- [ ] **Google Business Profil** optimieren: Fotos, Öffnungszeiten, Kategorie, Posts (W-09)
- [ ] Review-Anfrage-Automatisierung nach Abschluss: E-Mail-Sequenz + direkter Link zu Google Reviews (R-02)

### Immobiliendatenbank-Erweiterungen
- [ ] **Exposé-Generator**: automatisches, gebrandetes PDF-Exposé aus Objektdaten (Plan A Layout, Kontaktdaten), Download oder per E-Mail (PD-05)

### Verkäufer-Portal-Erweiterungen
- [ ] **Dokument-Upload** im Einreichungsformular: Grundbuchauszug, Energieausweis, Grundriss (PDF/JPG/PNG, max. 20 MB) (PS-03)

### Käufer-Erweiterungen
- [ ] **Allgemeine Interessenten-Registrierung**: Käufer ohne spezifisches Objekt registrieren Wunschkriterien (Typ, Lage, Budget, Zeitrahmen) → Käufer-Lead für Matching (BA-04)

### Admin & Bewertungen
- [ ] **Admin-Moderation für Bewertungen**: Freigeben, ausblenden, als „featured" markieren (R-03)
- [ ] **Checklisten-Vorlagen** pro Transaktionstyp (Haus, Wohnung, Kapitalanlage) (D-05)

---

## Phase 3 – Strategische Erweiterungen (P2)

- [ ] **ImmoScout24-Sync**: aktive Listings via OpenImmo XML-API pushen, Statusänderungen zurücksynchronisieren (PD-06)
- [ ] **Immobilien-Analytics**: Aufrufe, Anfragen, Vermarktungsdauer, Conversion-Rate pro Objekt, Dashboard (PD-07)
- [ ] **Käufer-Objekt-Matching**: neues Listing triggert Abgleich mit registrierten Käufern nach Kriterien, Benachrichtigungs-E-Mail (BA-06)
- [ ] KfW-/Förder-Partner-Integration: Verlinkung / Kooperationsdarstellung auf Website (Businessplan, Abschnitt 6.3)
- [ ] Wertoptimierungs-Baustein auf Website darstellen (Strategie vor Vermarktung, Partner-Netzwerk) (Businessplan, Abschnitt 6.3)
- [ ] Selbst gehostetes CRM (kein SaaS): Leads, Pipeline (Neu → Qualifiziert → Mandat), Notizen, Timeline (PRD 2.4)

---

## Marketing & SEO (laufend)

- [ ] Google Business Profil anlegen und verifizieren (Mosbach)
- [ ] Keyword-Strategie umsetzen: „Immobilie verkaufen Mosbach", „Immobilienmakler Neckar-Odenwald-Kreis"
- [ ] Erste 3 SEO-Blogartikel verfassen (z. B. „Häufige Fehler beim Immobilienverkauf", „Warum Käufer ohne Finanzierungsnachweis ein Risiko sind", „Immobilien im NOK: Was ist mein Haus wert?")
- [ ] Social-Media-Strategie: kurze Reels/Clips (Verkaufsmythen, Finanzierungs-Tipps, Fehler vermeiden)
- [ ] Lokales Netzwerk aufbauen: Steuerberater, Anwälte (Erbrecht), Hausverwaltungen, Handwerker
- [ ] Erste Google-Rezensionen aktiv anfragen (nach Erstgesprächen)

---

## Technische Infrastruktur (Trinity Agency)

- [ ] Domain + Hosting einrichten (selbst gehostet, kein SaaS, volle Datensouveränität)
- [ ] SSL-Zertifikat
- [ ] E-Mail-System: info@plana-immobilien.de (oder finale Domain)
- [ ] Backup-Strategie
- [ ] Deployment-Pipeline (CI/CD)
- [ ] DSGVO-konformes Cookie-System
- [ ] Monitoring & Uptime-Alerts

---

## Inhalte – noch zu erstellen

- [ ] Finale Telefonnummer und E-Mail-Adresse eintragen
- [ ] Finale Büroadresse (Mosbach) eintragen
- [ ] Professionelle Fotos: Ali Artun (Profil, Büro, Außenaufnahme)
- [ ] Logo in allen benötigten Formaten (PNG transparent, JPG, SVG falls vorhanden)
- [ ] Impressum-Text (vollständig, rechtlich geprüft)
- [ ] Datenschutzerklärung (DSGVO-konform)
- [ ] AGB (falls erforderlich)
- [ ] Erste echte Immobilien-Listings befüllen (sobald Mandate vorhanden)
