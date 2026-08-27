"use client";

import { Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

const ContactForm = () => {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 1000);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="py-6 px-4 space-y-6 rounded-md shadow-md w-full bg-white"
    >
      <div className="space-y-2">
        <h1 className="section-title text-secondary">
          {t("forms.messageTitle")}
        </h1>
        <p>{t("forms.messageIntro")}</p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="font-[500]">
              {t("forms.fullName")}
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ex: Jean Dupont"
                className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="font-[500]">
              {t("forms.professionalEmail")}
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="contact@example.com"
                className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5 col-span-1 md:col-span-2">
            <label htmlFor="service" className="font-[500]">
              {t("forms.subject")}
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="collab">{t("forms.collaboration")}</option>
              <option value="info">{t("forms.information")}</option>
              <option value="other">{t("forms.other")}</option>
            </select>
          </div>
          <div className="space-y-1.5 col-span-1 md:col-span-2">
            <label htmlFor="name" className="font-[500]">
              {t("forms.message")}
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
              {t("actions.send")} <SendIcon size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
