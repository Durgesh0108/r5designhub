import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await prismadb.category.findMany({
      where: {
        id: params.categoryId,
      },
      include: {
        subcategory: true,
        subsubcategory: true,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
