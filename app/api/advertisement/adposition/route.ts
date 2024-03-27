import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    const Adposition = await prismadb.adposition.create({
      data: {
        name: name,
      },
    });
    // console.log("Ad Banner Api:", Adbanner);
    return NextResponse.json(Adposition);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const Adposition = await prismadb.adposition.findMany({
      include: {
        AdPrice: true,
      },
    });
    // console.log("banner Api:", adbanners);
    return NextResponse.json(Adposition);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
