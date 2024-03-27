import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { subsubcategoryId: string } }
) {
  try {
    const brands = await prismadb.brands.findMany({
      where: { subsubcategoryId: params.subsubcategoryId },
    });

    console.log("api brands", brands);
    return NextResponse.json(brands);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
