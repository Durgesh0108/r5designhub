import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { review, userId, companyName } = body;

    const category = await prismadb.testimonial.create({
      data: {
        review,
        companyName,
        userId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const testimonial = await prismadb.testimonial.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
