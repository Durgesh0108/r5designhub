import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, categoryId } = body;

    const size = await prismadb.size.create({
      data: {
        name: name,
        categoryId: categoryId,
      },
    });

    // console.log(body)
    // return NextResponse.json(body);
    return NextResponse.json(size);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const sizes = await prismadb.size.findMany({});
    return NextResponse.json(sizes);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
