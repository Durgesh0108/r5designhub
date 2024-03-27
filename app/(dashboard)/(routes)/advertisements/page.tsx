import React from "react";
import AdBannerPage from "./_components/banner/page";
import AdDurationPage from "./_components/duration/page";
import AdSizePage from "./_components/size/page";
import AdTypePage from "./_components/type/page";
import AdPricePage from "./_components/price/page";

export default function AdvertisementPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Advertisements</h1>
      <div className="grid grid-cols-1  gap-8">
        <div className="rounded-lg border-black border-2 p-8">
          Advertisement Form
        </div>
      </div>
    </div>
  );
}
