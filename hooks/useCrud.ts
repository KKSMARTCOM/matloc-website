"use client";

import { useCallback, useEffect, useState } from "react";

interface UseCrudOptions<T> { endpoint: string; }

export function useCrud<T extends { id: string }>({ endpoint }: UseCrudOptions<T>) {
  const [items, setItems]   = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(endpoint);
      const d = await r.json() as { items?: T[] };
      setItems(d.items ?? []);
    } catch (e) { setError(String(e)); }
    finally { setLoading(false); }
  }, [endpoint]);

  useEffect(() => { void load(); }, [load]);

  const save = useCallback(async (data: Partial<T> & { id?: string }): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error("Erreur serveur");
      await load();
      return true;
    } catch (e) { setError(String(e)); return false; }
    finally { setSaving(false); }
  }, [endpoint, load]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      const r = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!r.ok) throw new Error("Erreur serveur");
      setItems((prev) => prev.filter((i) => i.id !== id));
      return true;
    } catch (e) { setError(String(e)); return false; }
    finally { setSaving(false); }
  }, [endpoint]);

  return { items, loading, saving, error, save, remove, reload: load };
}
