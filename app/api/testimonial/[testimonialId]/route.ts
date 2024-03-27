import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    const values = await req.json();
    const { testimonialId } = params;

    // console.log(testimonialId), console.log(values);

    const testimonial = await prismadb.testimonial.update({
      where: {
        id: testimonialId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  try {
    // const values = await req.json();
    const { testimonialId } = params;

    // console.log(testimonialId);
    // console.log(values);

    const testimonial = await prismadb.testimonial.delete({
      where: {
        id: testimonialId,
      },
    });
    return NextResponse.json(testimonial);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
