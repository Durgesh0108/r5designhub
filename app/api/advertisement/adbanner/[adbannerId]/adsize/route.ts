import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { adbannerId: string } }
) {
  try {
    const adSize = await prismadb.adsize.findMany({
      where: {
        AdBannerId: params.adbannerId,
      },
    });
    // console.log("Ad Size Banner Id Api:", adSize);
    return NextResponse.json(adSize);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
