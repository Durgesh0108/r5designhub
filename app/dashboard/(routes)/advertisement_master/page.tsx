import React from "react";
import AdBannerPage from "./_components/banner/page";
import AdDurationPage from "./_components/duration/page";
import AdSizePage from "./_components/size/page";
import AdTypePage from "./_components/type/page";
import AdPricePage from "./_components/price/page";
import AdPositionPage from "./_components/position/page";
import Card from "@/components/ui/Card";

export default function AdvertisementPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Advertisement Master</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className={"p-8"}>
          <AdPositionPage />
        </Card>
        <Card className={"p-8"}>
          <AdBannerPage />
        </Card>
        <Card className={"p-8"}>
          <AdDurationPage />
        </Card>
        <Card className={"p-8"}>
          <AdSizePage />
        </Card>
        <Card className={"p-8"}>
          <AdTypePage />
        </Card>
        <Card className={"p-8"}>
          <AdPricePage />
        </Card>
      </div>
    </div>
  );
}
