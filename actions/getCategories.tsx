import prismadb from "@/lib/prisma";
import React from "react";

export async function getCategory() {
  try {
    const response = await fetch("/api/category");
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}
