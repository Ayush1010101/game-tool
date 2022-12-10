"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
