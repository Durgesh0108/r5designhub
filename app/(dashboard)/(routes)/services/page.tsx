import { Separator } from "@/components/ui/separator";
import React from "react";
import ServiceCategoryPage from "./category/page";
import ServiceSubcategoryPage from "./subcategory/page";

export default function ServicePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Service Category</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg border-black border-2 p-8">
          <ServiceCategoryPage />
        </div>

        <div className="rounded-lg border-black border-2 p-8">
          <ServiceSubcategoryPage />
        </div>
      </div>
    </div>
  );
}
