import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const getResend = () => new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, telefon, email, betreff, nachricht } = body;

  if (!name || !email || !nachricht) {
    return NextResponse.json({ error: "Name, E-Mail und Nachricht sind Pflichtfelder." }, { status: 400 });
  }

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
              <p style="margin:0 0 4px;font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:#C8A45A;">
                PLAN A IMMOBILIEN & FINANZIERUNG
              </p>
              <h1 style="margin:0;font-size:22px;color:#FFFFFF;font-weight:400;line-height:1.3;">
                Neue Kontaktanfrage
              </h1>
            </td>
          </tr>

          <!-- Betreff-Band -->
          <tr>
            <td style="background:#C8A45A;padding:12px 40px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#1A1A1A;letter-spacing:0.05em;">
                Betreff: ${betreff ?? "Nicht angegeben"}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:36px 40px;border-radius:0 0 16px 16px;">

              <!-- Kontaktdaten -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td colspan="2" style="padding-bottom:12px;border-bottom:1.5px solid #F0E8DA;margin-bottom:16px;">
                    <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#C8A45A;">
                      KONTAKTDATEN
                    </p>
                  </td>
                </tr>
                <tr><td height="12"></td></tr>
                <tr>
                  <td style="width:140px;padding:8px 0;font-size:12px;color:#A89070;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;">Name</td>
                  <td style="padding:8px 0;font-size:14px;color:#1A1A1A;font-weight:500;">${name}</td>
                </tr>
                <tr>
                  <td style="width:140px;padding:8px 0;font-size:12px;color:#A89070;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;">E-Mail</td>
                  <td style="padding:8px 0;font-size:14px;color:#1A1A1A;">
                    <a href="mailto:${email}" style="color:#C8A45A;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="width:140px;padding:8px 0;font-size:12px;color:#A89070;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;">Telefon</td>
                  <td style="padding:8px 0;font-size:14px;color:#1A1A1A;">
                    ${telefon ? `<a href="tel:${telefon}" style="color:#C8A45A;text-decoration:none;">${telefon}</a>` : '<span style="color:#C8A45A;">—</span>'}
                  </td>
                </tr>
              </table>

              <!-- Nachricht -->
              <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#C8A45A;">
                NACHRICHT
              </p>
              <div style="background:#F5EDE0;border-left:3px solid #C8A45A;border-radius:0 10px 10px 0;padding:18px 20px;">
                <p style="margin:0;font-size:14px;color:#2C1A0E;line-height:1.7;font-weight:300;white-space:pre-wrap;">${nachricht}</p>
              </div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td>
                    <a href="mailto:${email}" style="display:inline-block;padding:13px 28px;background:linear-gradient(135deg,#C8A45A,#D4B87E);color:#1A1A1A;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:0.05em;">
                      Jetzt antworten →
                    </a>
                  </td>
                </tr>
              </table>

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
    await getResend().emails.send({
      from: "Plan A Webseite <onboarding@resend.dev>",
      to: "Info@plana-immobilien-finanzierung.com",
      replyTo: email,
      subject: `Neue Kontaktanfrage: ${betreff ?? "Allgemein"}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
