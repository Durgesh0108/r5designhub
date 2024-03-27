import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name,value } = body;

    const Adduration = await prismadb.adduration.create({
      data: {
        name: name,
        value: value,
      },
    });
    return NextResponse.json(Adduration);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const adDurations = await prismadb.adduration.findMany({
      include: {
        AdPrice: true,
      },
    });
    return NextResponse.json(adDurations);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
