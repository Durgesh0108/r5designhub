import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, hexcode } = body;

    const color = await prismadb.colors.create({
      data: {
        name: name,
        hexcode,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const colors = await prismadb.colors.findMany({});
    return NextResponse.json(colors);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
