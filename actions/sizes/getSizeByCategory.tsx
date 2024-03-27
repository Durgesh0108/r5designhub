import prismadb from "@/lib/prisma";
import React from "react";

export async function getSizeByCategory(categoryId: string) {
  try {
    const response = await fetch(`/api/sizes/category/${categoryId}`);
    const sizes = await response.json();
    console.log("sizes", sizes);
    return sizes;
  } catch (error) {
    console.log(error);
  }
}
