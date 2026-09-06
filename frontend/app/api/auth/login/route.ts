import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, LoginResponse } from "@/app/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${process.env.AUTH_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return NextResponse.json(
      data ?? { message: "Invalid credentials" },
      { status: res.status }
    );
  }

  const { accessToken, user } = data as LoginResponse;

  const response = NextResponse.json({ user }, { status: 200 });

  response.cookies.set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour — match your Jwt expiry setting
  });

  return response;
}