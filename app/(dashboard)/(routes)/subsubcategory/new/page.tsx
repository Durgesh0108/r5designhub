// "use client"
"use server"

import React, { useState } from "react";
// import { SubSubCategoryForm } from './components/SubSubCategoryForm'

import prismadb from "@/lib/prisma";
// import SubSubCategoryForm from './components/SubSubCategoryForm'
import { SubSubCategoryForm } from "./components/SubSubCategoryForm";

export default async function NewSubSubCategoryPage() {
  // let categoryId = "";

  // // const handleCategory = (data: string) => {
  // //   categoryId = data;
  // // };
  // const handleCategory = (data:string) => {
  //   categoryId = data;
  // };

  const categories = await prismadb.category.findMany({});
  const subcategories = await prismadb.subcategory.findMany({});

  return (
    <div>
      <SubSubCategoryForm
        categories={categories}
        subcategories={subcategories}
        // categoryId={() => handleCategory}
      />       
    </div>
  );
}
