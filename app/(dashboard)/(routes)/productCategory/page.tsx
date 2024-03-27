import { Separator } from "@/components/ui/separator";
import React from "react";
import CategoryPage from "../category/page";
import SubcategoryPage from "../subcategory/page";
import SubSubCategoryPage from "../subsubcategory/page";

export default function ProductCategoryPage() {

  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Product Category</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg border-black border-2 p-8">
          <CategoryPage />
        </div>
        {/* <Separator /> */}
        <div className="rounded-lg border-black border-2 p-8">
          <SubcategoryPage />
        </div>
        {/* <Separator /> */}
        <div className="rounded-lg border-black border-2 p-8">
          <SubSubCategoryPage />
        </div>
      </div>
    </div>
  );
}
