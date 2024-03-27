import prismadb from "@/lib/prisma";
import React from "react";

export async function getAdBanners() {
  try {
    const response = await fetch("/api/advertisement/adbanner");
    const adbanners = await response.json();
    return adbanners;
  } catch (error) {
    console.log(error);
  }
}
