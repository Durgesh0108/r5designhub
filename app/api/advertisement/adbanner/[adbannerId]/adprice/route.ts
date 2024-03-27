import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      adbannerId: string;
        // addurationId: string;
        // adsizeId: string;
        // adtypeId: string;
    };
  }
) {
  try {
    const adPrice = await prismadb.adPrice.findMany({
      //   where: {
      //     AdbannerId: params.adbannerId,
      //   },
      include: {
        AdBanner: true,
        AdDuration: true,
        AdSize: true,
        AdType: true,
      },
    });
    // console.log("Ad Size Banner Id Api:", adSize);
    return NextResponse.json(adPrice);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
