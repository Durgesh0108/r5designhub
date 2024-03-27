import prismadb from "@/lib/prisma";
import React from "react";

export async function getAdPrice() {
  try {
    const response = await fetch("/api/advertisement/adprice");
    const adsize = await response.json();
    return adsize;
  } catch (error) {
    console.log(error);
  }
}
