import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const response = await clerkClient();
    const users = await response.users.getUserList();

    const userId = users.data[0].id;

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log(err);

    return new NextResponse("Internal server error", { status: 500 });
  }
};
