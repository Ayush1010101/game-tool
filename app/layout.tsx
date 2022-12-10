import "server-only";

import SupabaseListener from "./supabase-listener";
import Navigation from "components/Navigation";
import Provider from "./provider";
import createClient from "../utils/supabase-server";

import "./globals.css";

export const revalidate = 0


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  
  return (
    <html lang="en">
      <head />
      <body>
        <Navigation user={session?.user} />
        <SupabaseListener accessToken={session?.access_token} />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
