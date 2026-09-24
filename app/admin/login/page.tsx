"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirect     = searchParams.get("redirect") ?? "/admin";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) { setError(data.error ?? "Identifiants incorrects."); return; }
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex">

      {/* ── Panneau gauche — branding ── */}
      <div className="hidden lg:flex w-1/2 bg-[#1a2540] flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Image src="/assets/images/logo-matloc.jpg" alt="MATLOC" width={32} height={32}
              className="w-8 h-8 object-contain rounded-lg" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">MATLOC</p>
            <p className="text-white/40 text-xs">Administration</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Gérez votre site<br />en toute simplicité
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            Modifiez textes, images et contenus directement depuis ce panneau d'administration sécurisé.
          </p>
        </div>

        <div className="flex gap-2">
          {[1,2,3].map((i) => (
            <div key={i} className={`h-1.5 rounded-full ${i === 1 ? "w-8 bg-orange-500" : "w-4 bg-white/20"}`} />
          ))}
        </div>
      </div>

      {/* ── Panneau droit — formulaire ── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Logo mobile */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <Image src="/assets/images/logo-matloc.jpg" alt="MATLOC" width={40} height={40}
              className="w-10 h-10 object-contain rounded-xl" />
            <p className="font-bold text-gray-900">MATLOC Admin</p>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Connexion</h1>
            <p className="text-sm text-gray-400 mt-1">Entrez vos identifiants pour accéder à l&apos;administration.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required autoFocus placeholder="admin@matloc.bj"
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#1a2540] focus:ring-2 focus:ring-[#1a2540]/10 transition" />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#1a2540] focus:ring-2 focus:ring-[#1a2540]/10 transition" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3 bg-[#1a2540] hover:bg-[#243357] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors duration-150">
              {loading ? <Loader2 size={17} className="animate-spin" /> : <ArrowRight size={17} />}
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-300 mt-8">
            © {new Date().getFullYear()} MATLOC BTP
          </p>
        </div>
      </div>
    </div>
  );
}
