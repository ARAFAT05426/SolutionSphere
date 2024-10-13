import connectDB from "@/utilities/connectDB";
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/user.model";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);

  // Pagination and search params
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");
  const skip = (page - 1) * limit;
  const searchQuery = searchParams.get("search")?.trim() || "";

  // Build search filter for name or email if search query is present
  const searchFilter = searchQuery
    ? {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find(searchFilter).skip(skip).limit(limit);
    const totalCount = await User.countDocuments(searchFilter);

    return NextResponse.json({ users, totalCount });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
