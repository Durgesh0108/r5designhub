import prismadb from "@/lib/prisma";
import React from "react";

export async function getAdvertisements() {
  try {
    const response = await fetch("/api/advertisement");
    const advertisements = await response.json();
    return advertisements;
  } catch (error) {
    console.log(error);
  }
}
