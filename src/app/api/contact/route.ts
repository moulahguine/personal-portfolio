import { NextResponse } from "next/server";
import { submitContactForm } from "@/features/Contact";

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await submitContactForm(formData);

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  if (result.reason === "not_configured") {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 503 },
    );
  }

  if (result.reason === "validation") {
    return NextResponse.json(
      { error: "Validation failed.", errors: result.errors },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { error: "Form submission failed." },
    { status: 502 },
  );
}
