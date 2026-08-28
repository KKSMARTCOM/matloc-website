import { SERVICE_OPTIONS } from "@/constants/form";
import nodemailer from "nodemailer";

type FormPayload = {
  formType: "quote" | "contact";
  name: string;
  email: string;
  message: string;
  phone?: string;
  status?: string;
  service?: string;
  subject?: string;
};

const isString = (value: unknown): value is string => typeof value === "string";

const getRequiredValue = (value: unknown) =>
  isString(value) ? value.trim() : "";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<FormPayload>;
    const formType = body.formType;
    const name = getRequiredValue(body.name);
    const email = getRequiredValue(body.email);
    const message = getRequiredValue(body.message);

    if (
      (formType !== "quote" && formType !== "contact") ||
      !name ||
      !email ||
      !message ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      return Response.json({ error: "Données invalides." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const mailFrom = process.env.MAIL_FROM || smtpUser;
    const mailTo = process.env.MAIL_TO || "info.matloc@gmail.com";

    if (!smtpHost || !smtpUser || !smtpPassword || !mailFrom) {
      console.error("Configuration SMTP incomplète.");
      return Response.json(
        { error: "Le service d’envoi est momentanément indisponible." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    const isQuote = formType === "quote";
    const details = [
      `Nom : ${name}`,
      `Email : ${email}`,
      body.phone ? `Téléphone : ${getRequiredValue(body.phone)}` : "",
      isQuote && body.status ? `Statut : ${getRequiredValue(body.status)}` : "",
      isQuote && body.service
        ? `Service : ${getRequiredValue(SERVICE_OPTIONS.find((opt) => opt.key === body.service)?.label)}`
        : "",
      !isQuote && body.subject
        ? `Sujet : ${getRequiredValue(body.subject)}`
        : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: isQuote ? `Demande de devis - ${name}` : `Contact - ${name}`,
      text: details,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Échec de l’envoi du formulaire :", error);
    return Response.json(
      { error: "Impossible d’envoyer votre demande pour le moment." },
      { status: 500 },
    );
  }
}
