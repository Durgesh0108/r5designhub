import React from "react";
import AdBannerPage from "./_components/banner/page";
import AdDurationPage from "./_components/duration/page";
import AdSizePage from "./_components/size/page";
import AdTypePage from "./_components/type/page";
import AdPricePage from "./_components/price/page";
import AdPositionPage from "./_components/position/page";

export default function AdvertisementPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Advertisement Master</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg border-black border-2 p-8">
          <AdPositionPage />
        </div>
        <div className="rounded-lg border-black border-2 p-8">
          <AdBannerPage />
        </div>
        <div className="rounded-lg border-black border-2 p-8">
          <AdDurationPage />
        </div>
        <div className="rounded-lg border-black border-2 p-8">
          <AdSizePage />
        </div>
        <div className="rounded-lg border-black border-2 p-8">
          <AdTypePage />
        </div>
        <div className="rounded-lg border-black border-2 p-8">
          <AdPricePage />
        </div>
      </div>
    </div>
  );
}
