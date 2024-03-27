import prismadb from "@/lib/prisma";
import React from "react";

export async function getsubcategory() {
  try {
    const response = await fetch("/api/service/subcategory");
    const subcategory  = await response.json();
    return subcategory;
  } catch (error) {
    console.log(error);
  }
}
