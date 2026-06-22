import { NextRequest, NextResponse } from "next/server";

const DJANGO_URL = process.env.DJANGO_API_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${DJANGO_URL}/api/predict/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Django API error:", err);
    return NextResponse.json(
      { error: "Could not reach prediction server" },
      { status: 503 }
    );
  }
}