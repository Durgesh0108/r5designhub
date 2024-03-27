import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    const servicecategory = await prismadb.serviceCategory.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json(servicecategory);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const servicecategories = await prismadb.serviceCategory.findMany({
      include: {
        servicesubcategory: true,
      },
    });
    return NextResponse.json(servicecategories);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
