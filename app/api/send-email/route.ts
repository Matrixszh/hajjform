import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

type AttachmentSummary = {
  field: "passportCopy" | "photograph";
  filename: string | null;
  contentType: string | null;
  size: number | null;
  included: boolean;
  reason: string | null;
};

function normalizeEnv(value: string | undefined) {
  return value?.trim().replace(/\s+/g, "");
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error && err.message.trim().length > 0) {
    return err.message;
  }

  return "Unexpected email transport error.";
}

function getTransportErrorResponse(err: unknown) {
  const message = getErrorMessage(err);
  const lower = message.toLowerCase();

  if (
    lower.includes("invalid login") ||
    lower.includes("username and password not accepted") ||
    lower.includes("badcredentials") ||
    lower.includes("auth")
  ) {
    return {
      status: 401,
      error:
        "Zoho authentication failed. Check EMAIL_USER and EMAIL_PASS in Vercel.",
      details: message,
    };
  }

  if (
    lower.includes("timeout") ||
    lower.includes("etimedout") ||
    lower.includes("econnreset") ||
    lower.includes("econnrefused") ||
    lower.includes("network")
  ) {
    return {
      status: 502,
      error: "Could not connect to Zoho SMTP from the server.",
      details: message,
    };
  }

  return {
    status: 502,
    error: "Email transporter verification failed.",
    details: message,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 10px;border:1px solid #e6d7bf;background:#fff8ec;font-weight:600;white-space:nowrap;">${escapeHtml(
    label
  )}</td><td style="padding:6px 10px;border:1px solid #e6d7bf;background:#ffffff;">${escapeHtml(
    value
  )}</td></tr>`;
}

function section(title: string, rows: string) {
  return `<h2 style="margin:22px 0 10px;font-size:14px;letter-spacing:0.14em;text-transform:uppercase;color:#0c4336;">${escapeHtml(
    title
  )}</h2><table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">${rows}</table>`;
}

async function fileToAttachment(
  field: "passportCopy" | "photograph",
  fileValue: FormDataEntryValue | null
): Promise<{
  attachment:
    | { filename: string; content: Buffer; contentType: string }
    | null;
  summary: AttachmentSummary;
}> {
  if (!fileValue || typeof fileValue === "string") {
    return {
      attachment: null,
      summary: {
        field,
        filename: null,
        contentType: null,
        size: null,
        included: false,
        reason: "Missing",
      },
    };
  }

  const file = fileValue as File;
  const filename = file.name || `${field}.png`;
  const contentType = file.type || "application/octet-stream";
  const size = file.size ?? null;

  if (typeof file.size === "number" && file.size > MAX_IMAGE_BYTES) {
    return {
      attachment: null,
      summary: {
        field,
        filename,
        contentType,
        size,
        included: false,
        reason: "Skipped (over 4MB)",
      },
    };
  }

  const arrayBuffer = await file.arrayBuffer();
  return {
    attachment: {
      filename,
      content: Buffer.from(arrayBuffer),
      contentType,
    },
    summary: {
      field,
      filename,
      contentType,
      size,
      included: true,
      reason: null,
    },
  };
}

export async function POST(req: Request) {
  try {
    const emailUser = normalizeEnv(process.env.EMAIL_USER);
    const emailPass = normalizeEnv(process.env.EMAIL_PASS);
    const emailTo = process.env.EMAIL_TO?.trim() || emailUser;

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: "Missing EMAIL_USER/EMAIL_PASS configuration." },
        { status: 500 }
      );
    }
    if (!emailTo) {
      return NextResponse.json(
        { error: "Missing EMAIL_TO destination." },
        { status: 500 }
      );
    }

    const formData = await req.formData();

    const getText = (key: string) => {
      const raw = formData.get(key);
      if (!raw || typeof raw !== "string") return "";
      return raw.trim();
    };

    const firstName = getText("firstName");
    const middleName = getText("middleName");
    const lastName = getText("lastName");
    const motherName = getText("motherName");
    const fatherName = getText("fatherName");
    const email = getText("email");
    const cellPhone = getText("cellPhone");
    const dateOfBirth = getText("dateOfBirth");
    const gender = getText("gender");
    const nationality = getText("nationality");
    const previousNationality = getText("previousNationality");

    const streetAddress = getText("streetAddress");
    const city = getText("city");
    const zipCode = getText("zipCode");
    const state = getText("state");
    const passportNumber = getText("passportNumber");
    const dateOfIssue = getText("dateOfIssue");
    const dateOfExpiration = getText("dateOfExpiration");

    const packageType = getText("packageType");
    const departureCity = getText("departureCity");
    const travelingCompanions = getText("travelingCompanions");

    const termsAcceptedRaw = getText("termsAccepted");
    const termsAccepted =
      termsAcceptedRaw.toLowerCase() === "true" ||
      termsAcceptedRaw.toLowerCase() === "on" ||
      termsAcceptedRaw === "1" ||
      termsAcceptedRaw.toLowerCase() === "yes";

    const passportCopyValue = formData.get("passportCopy");
    const photographValue = formData.get("photograph");

    const [passportCopy, photograph] = await Promise.all([
      fileToAttachment("passportCopy", passportCopyValue),
      fileToAttachment("photograph", photographValue),
    ]);

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    try {
      await transporter.verify();
    } catch (err) {
      const response = getTransportErrorResponse(err);
      return NextResponse.json(
        { error: response.error, details: response.details },
        { status: response.status }
      );
    }

    const personalRows =
      row("firstName", firstName) +
      row("middleName", middleName) +
      row("lastName", lastName) +
      row("motherName", motherName) +
      row("fatherName", fatherName) +
      row("email", email) +
      row("cellPhone", cellPhone) +
      row("dateOfBirth", dateOfBirth) +
      row("gender", gender) +
      row("nationality", nationality) +
      row("previousNationality", previousNationality);

    const addressRows =
      row("streetAddress", streetAddress) +
      row("city", city) +
      row("zipCode", zipCode) +
      row("state", state) +
      row("passportNumber", passportNumber) +
      row("dateOfIssue", dateOfIssue) +
      row("dateOfExpiration", dateOfExpiration);

    const travelRows =
      row("packageType", packageType) +
      row("departureCity", departureCity) +
      row("travelingCompanions", travelingCompanions);

    const termsRows = row("termsAccepted", termsAccepted ? "Yes" : "No");

    const attachmentRows =
      row(
        "passportCopy",
        passportCopy.summary.included
          ? `${passportCopy.summary.filename ?? ""} (${passportCopy.summary.size ?? 0} bytes)`
          : passportCopy.summary.reason ?? "Skipped"
      ) +
      row(
        "photograph",
        photograph.summary.included
          ? `${photograph.summary.filename ?? ""} (${photograph.summary.size ?? 0} bytes)`
          : photograph.summary.reason ?? "Skipped"
      );

    const html = `
      <div style="font-family:Segoe UI, Tahoma, Arial, sans-serif;color:#243028;line-height:1.5;">
        <p style="margin:0 0 8px;">A new pilgrimage application was submitted.</p>
        ${section("Personal Information", personalRows)}
        ${section("Address & Passport Details", addressRows)}
        ${section("Travel Details", travelRows)}
        ${section("Terms Accepted", termsRows)}
        ${section("Attachment Information", attachmentRows)}
      </div>
    `;

    const attachments = [passportCopy.attachment, photograph.attachment].filter(
      (a): a is { filename: string; content: Buffer; contentType: string } =>
        Boolean(a)
    );

    const subject = `New Pilgrimage Application: ${firstName} ${lastName} - ${packageType}`;

    try {
      await transporter.sendMail({
        from: emailUser,
        to: emailTo,
        replyTo: email || undefined,
        subject,
        html,
        attachments,
      });
    } catch (err) {
      const response = getTransportErrorResponse(err);
      return NextResponse.json(
        { error: response.error, details: response.details },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error.";
    const lower = message.toLowerCase();
    const status =
      lower.includes("payload") || lower.includes("too large") ? 413 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
