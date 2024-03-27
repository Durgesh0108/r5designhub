import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    const Adbanner = await prismadb.adbanner.create({
      data: {
        name: name,
      },
    });
    // console.log("Ad Banner Api:", Adbanner);
    return NextResponse.json(Adbanner);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const adbanners = await prismadb.adbanner.findMany({
      include: {
        AdPrice: true,
        AdSize: true,
        AdType: true,
      },
    });
    // console.log("banner Api:", adbanners);
    return NextResponse.json(adbanners);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
