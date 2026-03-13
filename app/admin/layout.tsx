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

  const adminEmail =
    process.env.ADMIN_EMAIL || "Info@plana-immobilien-finanzierung.com";

  if (user.email !== adminEmail) {
    redirect("/");
  }

  return <AdminShell>{children}</AdminShell>;
}
