import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const sizes = await prismadb.size.findMany({
      where: { categoryId: params.categoryId },
    });

    console.log("api sizes", sizes);
    return NextResponse.json(sizes);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
