import prismadb from "@/lib/prisma";
import React from "react";

export async function getBrandsBycategories(subsubcategoryId: string) {
  try {
    const response = await fetch(`/api/brands/categories/${subsubcategoryId}`);
    const brands = await response.json();
    console.log("brands", brands);
    return brands;
  } catch (error) {
    console.log(error);
  }
}
