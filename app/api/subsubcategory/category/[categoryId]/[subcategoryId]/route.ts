import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string; subcategoryId: string } }
) {
  try {
    const subsubcategory = await prismadb.subsubcategory.findMany({
      where: {
        categoryId: params.categoryId,
        subcategoryId: params.subcategoryId,
      },
    });
    console.log("subdsa", subsubcategory);
    return NextResponse.json(subsubcategory);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
