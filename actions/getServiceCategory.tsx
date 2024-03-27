import prismadb from "@/lib/prisma";
import React from "react";

export async function getServiceCategory() {
  try {
    const response = await fetch("/api/service/category");
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
}
