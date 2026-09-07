"use client";

import { useCallback, useEffect, useState } from "react";
import type { SaveStatus } from "@/components/admin/SaveBar";
import type { Field } from "@/components/admin/FieldList";

export function useAdminCms(group: string) {
  const [fields, setFields]   = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus]   = useState<SaveStatus>("idle");

  useEffect(() => {
    fetch(`/api/cms/${group}`)
      .then((r) => r.json() as Promise<{ rows: Field[] }>)
      .then(({ rows }) => setFields(rows))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [group]);

  const handleChange = useCallback((key: string, value: string) =>
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f))),
  []);

  const handleSave = useCallback(async () => {
    setStatus("saving");
    const body = Object.fromEntries(fields.map((f) => [f.key, f.value]));
    try {
      const res = await fetch(`/api/cms/${group}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      setStatus(res.ok ? "saved" : "error");
      if (res.ok) setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }, [fields, group]);

  return { fields, loading, status, handleChange, handleSave };
}
