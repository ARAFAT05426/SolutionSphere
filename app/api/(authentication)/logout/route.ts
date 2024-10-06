import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("token", "", { httpOnly: true, path: "/", expires: new Date(0) });

    return response;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
