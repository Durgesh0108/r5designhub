import React from "react";
import Card from "@/components/ui/Card";
import BrandsPage from "./_components/brands/page";
import ColorsPage from "./_components/colors/page";
import SizePage from "./_components/sizes/page";
import CategoryPage from "./_components/category/page";
import SubcategoryPage from "./_components/subcategory/page";
import SubSubCategoryPage from "./_components/subsubcategory/page";

export default function ProductCategoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Products Master</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className={"p-8"}>
          <CategoryPage />
        </Card>

        <Card className={"p-8"}>
          <SubcategoryPage />
        </Card>

        <Card className={"p-8"}>
          <SubSubCategoryPage />
        </Card>
        <Card className={"p-8"}>
          <BrandsPage />
        </Card>
        <Card className={"p-8"}>
          <ColorsPage />
        </Card>
        <Card className={"p-8"}>
          <SizePage />
        </Card>
      </div>
    </div>
  );
}
