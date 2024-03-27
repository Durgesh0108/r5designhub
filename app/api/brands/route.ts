import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      // userId,
      imageUrl,
      categoryId,
      subcategoryId,
      subsubcategoryId,
      name,
    } = body;

    // console.log("body", body);
    const brand = await prismadb.brands.create({
      data: {
        // userId,
        name,
        imageUrl,
        categoryId,
        subcategoryId,
        subsubcategoryId,
      },
    });

    // console.log("brand", brand);

    // return NextResponse.json(body);
    return NextResponse.json(brand);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const brands = await prismadb.brands.findMany({
      include: {
        // user: true,
        category: true,
        subcategory: true,
        subsubcategory: true,
      },
    });
    return NextResponse.json(brands);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
