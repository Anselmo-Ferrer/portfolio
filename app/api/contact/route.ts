import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().max(120).trim(),
  message: z.string().min(10).max(2000).trim(),
});

const RATE_LIMIT_MS = 60_000;
const ipTimestamps = new Map<string, number>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const last = ipTimestamps.get(ip) ?? 0;

  if (now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before sending again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid input.", issues: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, message } = result.data;

  // Send email via Resend if API key is configured
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? "anselmoferrer.dev@gmail.com";

  if (resendKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message. Try again later." }, { status: 500 });
    }
  } else {
    // Log to console when Resend is not configured (dev mode)
    console.log("[Contact form]", { name, email, message });
  }

  ipTimestamps.set(ip, now);

  return NextResponse.json({ ok: true }, { status: 200 });
}
