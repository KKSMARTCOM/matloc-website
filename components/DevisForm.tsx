"use client";

import { Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

const DevisForm = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState<"particular" | "enterprise">(
    "particular",
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 1000);
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-md shadow-md bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="status" className="font-[500]">
            {t("forms.status")}
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "particular" | "enterprise")
            }
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          >
            <option value="particular">{t("forms.individual")}</option>
            <option value="enterprise">{t("forms.company")}</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="name" className="font-[500]">
            {t("forms.companyName")}
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={t("forms.fullName")}
              className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="font-[500]">
            {t("forms.phone")}
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+229..."
              className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="name" className="font-[500]">
            {t("forms.email")}
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="johndoe@email.com"
              className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5 col-span-1 md:col-span-2">
          <label htmlFor="service" className="font-[500]">
            {t("forms.requestedService")}
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          >
            <option value="echafaudage">{t("service.height")}</option>
            <option value="btp">{t("service.equipment")}</option>
            <option value="elevation">{t("service.height")}</option>
            <option value="transport">{t("service.transport")}</option>
            <option value="chantier">{t("service.associated")}</option>
          </select>
        </div>
        <div className="space-y-1.5 col-span-1 md:col-span-2">
          <label htmlFor="name" className="font-[500]">
            {t("forms.detailedMessage")}
          </label>
          <div className="relative">
            <textarea
              name="message"
              id="message"
              value={message}
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("forms.describe")}
            ></textarea>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center py-4 rounded-lg cursor-pointer hover:bg-primary-hover items-center gap-2 bg-primary text-white w-full font-[600] mt-6"
      >
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <>
            {t("actions.sendRequest")} <SendIcon size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default DevisForm;
