import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, categoryId } = body;

    const subcategory = await prismadb.subcategory.create({
      data: {
        name: name,
        categoryId: categoryId,
      },
    });
    return NextResponse.json(subcategory);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const subcategory = await prismadb.subcategory.findMany({});
    return NextResponse.json(subcategory);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
