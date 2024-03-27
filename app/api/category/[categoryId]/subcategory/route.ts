import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const subcategory = await prismadb.subcategory.findMany({
      where: {
        categoryId: params.categoryId,
      },
    });
    return NextResponse.json(subcategory);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
