import prismadb from "@/lib/prisma";
import React from "react";

export async function getBrands() {
  try {
    const response = await fetch("/api/brands");
    const advertisements = await response.json();
    return advertisements;
  } catch (error) {
    console.log(error);
  }
}
