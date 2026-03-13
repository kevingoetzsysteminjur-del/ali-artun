import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Protect /konto
  if (path.startsWith("/konto") && !user) {
    return NextResponse.redirect(
      new URL("/anmelden?redirect=/konto", request.url)
    );
  }

  // Protect /admin
  if (path.startsWith("/admin")) {
    if (!user) {
      return NextResponse.redirect(
        new URL("/anmelden?redirect=/admin", request.url)
      );
    }
    const ADMIN_EMAILS = [
      "info@plana-immobilien-finanzierung.com",
      (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase(),
      (process.env.ADMIN_EMAIL || "").toLowerCase(),
    ].filter(Boolean);

    const userEmail = (user.email || "").toLowerCase();
    console.log("[middleware] user email:", userEmail, "| admin list:", ADMIN_EMAILS);

    if (!ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/konto/:path*", "/admin/:path*"],
};
