import { NextResponse } from "next/server";
import { appendRsvp, ensureHeader, getRsvps, totalGuests, updateRsvp } from "../../../lib/googleSheets";

export const runtime = "nodejs";

function normalizePhone(value: unknown) {
  return String(value ?? "").replace(/\D/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = normalizePhone(body.phone);
    const guests = Number(body.guests);
    const action = body.action === "update" ? "update" : "create";

    if (!name) return NextResponse.json({ success: false, error: "Please enter your name." }, { status: 400 });
    if (phone.length < 7 || phone.length > 15) return NextResponse.json({ success: false, error: "Please enter a valid phone number." }, { status: 400 });
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) return NextResponse.json({ success: false, error: "Guest count must be between 1 and 20." }, { status: 400 });

    await ensureHeader();
    const rows = await getRsvps();
    const existing = rows.find((row) => row.phone === phone);

    if (existing && action === "create") {
      return NextResponse.json({
        success: false,
        duplicate: true,
        error: "This number is already registered.",
        currentGuests: existing.guests,
      }, { status: 409 });
    }

    if (!existing && action === "update") {
      return NextResponse.json({ success: false, error: "This phone number is not registered yet." }, { status: 404 });
    }

    const submittedAt = new Date().toISOString();
    if (existing) {
      await updateRsvp(existing.rowNumber, name, phone, guests, submittedAt);
    } else {
      await appendRsvp(name, phone, guests, submittedAt);
    }

    const updatedRows = await getRsvps();
    return NextResponse.json({
      success: true,
      updated: Boolean(existing),
      message: existing ? "Your RSVP has been updated successfully." : "Thank you! Your RSVP has been successfully saved.",
      totalGuests: totalGuests(updatedRows),
    });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json({ success: false, error: "Unable to save your RSVP right now. Please try again." }, { status: 500 });
  }
}
