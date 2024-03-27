import prismadb from "@/lib/prisma";
import React from "react";

export async function getColors() {
  try {
    const response = await fetch("/api/colors");
    const colors = await response.json();
    return colors;
  } catch (error) {
    console.log(error);
  }
}
