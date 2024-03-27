import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, categoryId, subcategoryId } = body;

    // console.log(categoryId, subcategoryId, name);
    const subsubcategory = await prismadb.subsubcategory.create({
      data: {
        name: name,
        categoryId: categoryId,
        subcategoryId: subcategoryId,
      },
    });
    return NextResponse.json(subsubcategory);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const subsubcategories = await prismadb.subsubcategory.findMany({})
    return NextResponse.json(subsubcategories);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}