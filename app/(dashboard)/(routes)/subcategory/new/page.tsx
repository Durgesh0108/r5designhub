import React from "react";
import prismadb from "@/lib/prisma";

import { SubCategoryForm } from "./components/SubCategoryForm";

export default async function page() {
  const categories = await prismadb.category.findMany({});

  return (
    <div>
      <SubCategoryForm categories={categories} />
    </div>
  );
}
