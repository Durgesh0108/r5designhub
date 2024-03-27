import prismadb from "@/lib/prisma";
import React from "react";

export default async function SubCategoryList() {
  const subcategories = await prismadb.subcategory.findMany({
    where: {
      category: {},
    },
  });
  return (
    <div>
      <div>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>{subcategory.name}</li>
        ))}
      </div>
    </div>
  );
}
