import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import KontoShell from "./KontoShell";

export const metadata = {
  title: "Mein Konto",
};

export default async function KontoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/anmelden?redirect=/konto");
  }

  return <KontoShell>{children}</KontoShell>;
}
