import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userId, imageUrl, AdDurationId, AdSizeId, AdTypeId, AdBannerId } =
      body;

    console.log("body", body);
    const advertisement = await prismadb.advertisement.create({
      data: {
        userId,
        imageUrl,
        AdbannerId: AdBannerId,
        AdDurationId: AdDurationId,
        AdSizeId: AdSizeId,
        AdTypeId: AdTypeId,
      },
    });

    console.log("advertisement", advertisement);

    // return NextResponse.json(body);
    return NextResponse.json(advertisement);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const advertisement = await prismadb.advertisement.findMany({
      include: {
        AdBanner: true,
        AdDuration: true,
        AdSize: true,
        AdType: true,
        user: {
          select: {
            name: true,
            phone_number: true,
          },
        },
      },
    });
    return NextResponse.json(advertisement);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
