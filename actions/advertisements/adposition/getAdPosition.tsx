import prismadb from "@/lib/prisma";
import React from "react";

export async function getAdPosition() {
  try {
    const response = await fetch("/api/advertisement/adposition");
    const adPosition = await response.json();
    return adPosition;
  } catch (error) {
    console.log(error);
  }
}
