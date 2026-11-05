import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ loggedIn: await verifyAdmin() });
}
