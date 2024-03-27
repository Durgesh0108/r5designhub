import prismadb from "@/lib/prisma";
import React from "react";

export async function getAdDurations() {
  try {
    const response = await fetch("/api/advertisement/adduration");
    const addurations = await response.json();
    return addurations;
  } catch (error) {
    console.log(error);
  }
}
