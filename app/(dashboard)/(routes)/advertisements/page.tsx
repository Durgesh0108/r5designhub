import React from "react";
import AdvertisementFormPage from "./_components/advertisementForm";

export default function AdvertisementPage() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-4xl font-bold">Advertisements</h1>
			<div className="grid grid-cols-1  gap-8">
				<div className="rounded-lg border-black border-2 p-8">
					<AdvertisementFormPage />
				</div>
			</div>
		</div>
	);
}
