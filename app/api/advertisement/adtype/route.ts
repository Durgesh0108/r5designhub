import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, AdBannerId} = body;
    // console.log("body", body);

    const AdType = await prismadb.adtype.create({
      data: {
        name: name,
        AdbannerId: AdBannerId
      },
    });

    // console.log(AdSize);
    return NextResponse.json(AdType);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const AdSize = await prismadb.adsize.findMany({
      include: {
        AdBanner: true,
        AdPrice: true,
      },
    });
    return NextResponse.json(AdSize);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
