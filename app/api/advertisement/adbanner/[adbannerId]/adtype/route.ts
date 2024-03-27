import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { adbannerId: string } }
) {
  try {
    const adType = await prismadb.adtype.findMany({
      where: {
        AdbannerId: params.adbannerId,
      },
    });
    // console.log("Ad Size Banner Id Api:", adType);
    return NextResponse.json(adType);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
