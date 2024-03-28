import React from "react";
import AdvertisementFormPage from "./_components/advertisementForm";
import Card from "@/components/ui/Card";

export default function AdvertisementPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Advertisements</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1  gap-8">
        <Card className={"p-8"}>
          <AdvertisementFormPage />
        </Card>
      </div>
    </div>
  );
}
