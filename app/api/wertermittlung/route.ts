import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function row(label: string, value: string) {
  return `
    <tr>
      <td style="width:150px;padding:9px 0;font-size:12px;color:#A89070;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">${label}</td>
      <td style="padding:9px 0;font-size:14px;color:#1A1A1A;font-weight:400;vertical-align:top;">${value || '<span style="color:#C8A45A;">—</span>'}</td>
    </tr>
  `;
}

function section(title: string, rows: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td colspan="2" style="padding-bottom:10px;border-bottom:1.5px solid #F0E8DA;">
          <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#C8A45A;">${title}</p>
        </td>
      </tr>
      <tr><td height="8"></td></tr>
      ${rows}
    </table>
  `;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    objektart, wohnflaeche, zimmer, baujahr, zustand, ausstattung,
    plz, ort, strasse, extras,
    name, email, telefon,
    estimatedValue,
  } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name und E-Mail sind Pflichtfelder." }, { status: 400 });
  }

  const extrasStr = Array.isArray(extras) && extras.length > 0 ? extras.join(", ") : null;

  const estimatedSection = estimatedValue
    ? `
      <tr>
        <td style="background:linear-gradient(135deg,rgba(200,164,90,0.12),rgba(200,164,90,0.06));border:1.5px solid rgba(200,164,90,0.3);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#C8A45A;">GESCHÄTZTE PREISSPANNE</p>
          <p style="margin:0;font-size:22px;font-weight:700;color:#1A1A1A;">${estimatedValue}</p>
        </td>
      </tr>
      <tr><td height="24"></td></tr>
    `
    : "";

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#F5EDE0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EDE0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1A0E05 0%,#2C1A0E 100%);border-radius:16px 16px 0 0;padding:36px 40px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#C8A45A;">PLAN A IMMOBILIEN & FINANZIERUNG</p>
              <h1 style="margin:0;font-size:22px;color:#FFFFFF;font-weight:400;line-height:1.3;">Neue Wertermittlungsanfrage</h1>
            </td>
          </tr>

          <!-- Objekt-Band -->
          <tr>
            <td style="background:#C8A45A;padding:12px 40px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#1A1A1A;letter-spacing:0.05em;">
                ${objektart ?? "Immobilie"} · ${plz ?? ""}${ort ? " " + ort : ""}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:36px 40px;border-radius:0 0 16px 16px;">

              <table width="100%" cellpadding="0" cellspacing="0">
                ${estimatedSection}
              </table>

              ${section("OBJEKTDATEN", `
                ${row("Objektart", objektart)}
                ${row("Wohnfläche", wohnflaeche ? wohnflaeche + " m²" : "")}
                ${row("Zimmer", zimmer ? String(zimmer) : "")}
                ${row("Baujahr", baujahr ? String(baujahr) : "")}
                ${row("Zustand", zustand)}
                ${row("Ausstattung", ausstattung)}
              `)}

              ${section("LAGE & EXTRAS", `
                ${row("PLZ", plz)}
                ${row("Ort", ort)}
                ${row("Straße", strasse)}
                ${row("Extras", extrasStr ?? "")}
              `)}

              ${section("KONTAKTDATEN", `
                ${row("Name", name)}
                ${row("E-Mail", `<a href="mailto:${email}" style="color:#C8A45A;text-decoration:none;">${email}</a>`)}
                ${row("Telefon", telefon ? `<a href="tel:${telefon}" style="color:#C8A45A;text-decoration:none;">${telefon}</a>` : "")}
              `)}

              <!-- CTA -->
              <a href="mailto:${email}" style="display:inline-block;padding:13px 28px;background:linear-gradient(135deg,#C8A45A,#D4B87E);color:#1A1A1A;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:0.05em;margin-top:4px;">
                Jetzt antworten →
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#A89070;line-height:1.7;">
                Plan A Immobilien & Finanzierung · Ali Artun<br />
                Mosbacher Str. 75, 74821 Mosbach<br />
                <a href="tel:01736259429" style="color:#C8A45A;text-decoration:none;">0173-6259429</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: "Plan A Webseite <onboarding@resend.dev>",
      to: "Info@plana-immobilien-finanzierung.com",
      replyTo: email,
      subject: `Neue Wertermittlung: ${objektart ?? "Immobilie"} in ${plz ?? ""}${ort ? " " + ort : ""}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
