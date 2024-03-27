import prismadb from "@/lib/prisma";
import React from "react";

export async function getAdSize() {
  try {
    const response = await fetch("/api/advertisement/adsize");
    const adsize = await response.json();
    return adsize;
  } catch (error) {
    console.log(error);
  }
}
