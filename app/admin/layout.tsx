import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "./AdminShell";

export const metadata = {
  title: "Admin Panel | Plan A Immobilien",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/anmelden?redirect=/admin");
  }

  const ADMIN_EMAILS = [
    "info@plana-immobilien-finanzierung.com",
    (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase(),
    (process.env.ADMIN_EMAIL || "").toLowerCase(),
  ].filter(Boolean);

  const userEmail = (user.email || "").toLowerCase();

  if (!ADMIN_EMAILS.includes(userEmail)) {
    redirect("/");
  }

  return <AdminShell>{children}</AdminShell>;
}
