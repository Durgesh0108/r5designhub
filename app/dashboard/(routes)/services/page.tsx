import { Separator } from "@/components/ui/separator";
import React from "react";
import ServiceCategoryPage from "./category/page";
import ServiceSubcategoryPage from "./subcategory/page";
import Card from "@/components/ui/Card";

export default function ServicePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Service Category</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className={"p-8"}>
          <ServiceCategoryPage />
        </Card>

        <Card className={"p-8"}>
          <ServiceSubcategoryPage />
        </Card>
      </div>
    </div>
  );
}
