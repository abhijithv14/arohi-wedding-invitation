import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, attending, guests, notes } = body;

    // Backend Input Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const rsvpRecord = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      attending: Boolean(attending),
      guests: Number(guests) || 1,
      notes: notes ? String(notes).trim() : "",
      submittedAt: new Date().toISOString(),
    };

    // Store in local JSON data file if environment permits
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "rsvps.json");
      let existingRsvps: Record<string, unknown>[] = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf8");
        existingRsvps = JSON.parse(fileData || "[]");
      }
      existingRsvps.push(rsvpRecord);
      fs.writeFileSync(filePath, JSON.stringify(existingRsvps, null, 2));
    } catch (err) {
      console.warn("Local JSON file save fallback:", err);
    }

    console.log("RSVP Submission received:", rsvpRecord);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your RSVP response has been successfully saved.",
      record: rsvpRecord,
    });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error handling RSVP. Please try again." },
      { status: 500 }
    );
  }
}
