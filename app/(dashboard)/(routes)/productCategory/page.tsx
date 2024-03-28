import { Separator } from "@/components/ui/separator";
import React from "react";
import CategoryPage from "../category/page";
import SubcategoryPage from "../subcategory/page";
import SubSubCategoryPage from "../subsubcategory/page";
import Card from "@/components/ui/Card";

export default function ProductCategoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Product Category</h1>
      <hr className="border-1 border-gray-400 " />
      {/* <Separator className="border-3 border-black " /> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <div className="rounded-lg border-black border-2 p-8"> */}
        <Card className={"p-8"}>
          <CategoryPage />
        </Card>
        {/* </div> */}
        {/* <Separator /> */}
        <Card className={"p-8"}>
          <SubcategoryPage />
        </Card>
        {/* <Separator /> */}
        <Card className={"p-8"}>
          <SubSubCategoryPage />
        </Card>
      </div>
    </div>
  );
}
