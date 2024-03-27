import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;
    // console.log(body);
    // console.log(name);
    // console.log("from Backend");

    const category = await prismadb.category.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await prismadb.category.findMany({
      include: {
        subcategory: {
          include: {
            subsubcategory: true,
          },
        },
        subsubcategory: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
