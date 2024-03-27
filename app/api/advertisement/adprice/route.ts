import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { price, AdBannerId, AdDurationId, AdSizeId, AdTypeId } = body;
    // console.log("body", body);

    const AdPrice = await prismadb.adPrice.create({
      data: {
        price: price,
        AdbannerId: AdBannerId,
        AdSizeId: AdSizeId,
        AdDurationId: AdDurationId,
        AdTypeId: AdTypeId,
      },
    });

    // console.log(AdSize);
    return NextResponse.json(AdPrice);
    // return NextResponse.json(body);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const AdPrice = await prismadb.adPrice.findMany({
      include: {
        AdBanner: true,
        AdDuration: true,
        AdSize: true,
        AdType: true,
      },
    });
    return NextResponse.json(AdPrice);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
