export type QuoteEmailProps = {
  name: string;
  email: string;
  phone?: string;
  status?: string;
  service?: string;
  message: string;
};

export type ContactEmailProps = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

type EmailDetails = Array<[string, string]>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!,
  );

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="width:36%;padding:12px 0;color:#6b7280;font-size:14px;font-weight:700;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</td>
    <td style="padding:12px 0;color:#1f2937;font-size:14px;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td>
  </tr>`;

const renderEmail = ({
  name,
  email,
  message,
  title,
  intro,
  details,
  formName,
}: {
  name: string;
  email: string;
  message: string;
  title: string;
  intro: string;
  details: EmailDetails;
  formName: string;
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const rows = details.map(([label, value]) => detailRow(label, value)).join("");

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;background-color:#ffffff;color:#1f2937;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;padding:24px 12px">
      <main style="overflow:hidden;background-color:#ffffff;border:2px solid #94a3b8;border-radius:10px;box-shadow:0 2px 8px rgba(17,24,39,.08)">
        <header style="padding:22px 24px;background-color:#1e2a4a;color:#ffffff">
          <p style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:1px">MATLOC</p>
          <p style="margin:8px 0 0;color:#fed7aa;font-size:14px">Solutions d'élévation, transport et équipements BTP</p>
        </header>
        <section style="padding:24px">
          <h1 style="margin:0 0 8px;color:#1e2a4a;font-size:22px;line-height:28px">${escapeHtml(title)}</h1>
          <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:24px">${escapeHtml(intro)}</p>
          <h2 style="margin:0 0 12px;color:#1e2a4a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.7px">Coordonnées</h2>
          <table style="width:100%;border-collapse:collapse" cellpadding="0" cellspacing="0" role="presentation"><tbody>${rows}</tbody></table>
          <h2 style="margin:28px 0 12px;color:#1e2a4a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.7px">Message</h2>
          <p style="margin:0;padding:16px;background-color:#fff7ed;border-left:4px solid #f97316;border-radius:4px;color:#374151;font-size:14px;line-height:22px">${safeMessage}</p>
          <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:24px;padding:12px 18px;background-color:#f97316;border-radius:6px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none">Répondre à ${safeName}</a>
        </section>
        <footer style="padding:16px 24px;background-color:#f9fafb;color:#6b7280;font-size:12px;line-height:18px">Cet e-mail a été envoyé automatiquement depuis le formulaire ${escapeHtml(formName)} du site MATLOC.</footer>
      </main>
    </div>
  </body>
</html>`;
};

export const renderQuoteEmail = ({ name, email, phone, status, service, message }: QuoteEmailProps) =>
  renderEmail({
    name,
    email,
    message,
    title: "Nouvelle demande de devis",
    intro: `${name} vient de soumettre une demande depuis le site MATLOC.`,
    details: [
      ["Nom / entreprise", name],
      ["E-mail", email],
      ["Téléphone", phone || "Non renseigné"],
      ["Statut", status || "Non renseigné"],
      ["Service demandé", service || "Non renseigné"],
    ],
    formName: "de demande de devis",
  });

export const renderContactEmail = ({ name, email, subject, message }: ContactEmailProps) =>
  renderEmail({
    name,
    email,
    message,
    title: "Nouveau message de contact",
    intro: `${name} vous a envoyé un message depuis le site MATLOC.`,
    details: [
      ["Nom", name],
      ["E-mail", email],
      ["Sujet", subject || "Non renseigné"],
    ],
    formName: "de contact",
  });

export default renderQuoteEmail;
