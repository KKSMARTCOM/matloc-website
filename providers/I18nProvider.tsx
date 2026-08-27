"use client";

import { I18nContextProvider } from "@/contexts/I18nContext";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nContextProvider>{children}</I18nContextProvider>;
}
