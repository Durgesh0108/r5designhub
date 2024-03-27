import prismadb from "@/lib/prisma";
import React from "react";

export const getsubsubcategory = async (
  categoryId: string,
  subcategoryId: string
) => {
  try {
    const response = await fetch(
      `/api/category/${categoryId}/subcategory/${subcategoryId}`
    );
    // const response = await fetch(
    //   `/api/subsubcategory/category/${categoryId}/${subcategoryId}`
    // );
    const subsubcategory = await response.json();

    return subsubcategory;
  } catch (error) {
    console.log(error);
  }
};

// export default getsubsubcategory;

export const getsubsubcategories = async () => {
  try {
    const response = await fetch(`/api/subsubcategory`);
    const subsubcategory = await response.json();

    return subsubcategory;
  } catch (error) {
    console.log(error);
  }
};

// export default getsubsubcategories;
