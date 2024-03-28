"use client";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
	AdPrice,
	Adbanner,
	Adduration,
	Adposition,
	Adsize,
	Adtype,
	Category,
	Subcategory,
} from "@prisma/client";
import { getCategory } from "@/actions/getCategories";
import { getsubcategory } from "@/actions/getSubcategories";
import getsubcatgeorybycategory from "@/actions/getsubcategorybycategory";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAdBanners } from "@/actions/advertisements/adbanner/getAdbanner";
import getAdsizebyAdBanner from "@/actions/advertisements/adsize/getAdSizeByAdBanner";
import { getAdSize } from "@/actions/advertisements/adsize/getAdSize";
import { getAdPosition } from "@/actions/advertisements/adposition/getAdPosition";
import { getAdDurations } from "@/actions/advertisements/adduration/getAdDurations";
import getAdTypebyAdBanner from "@/actions/advertisements/adtype/getAdTypebyAdBanner";

import getAdpriceByAll from "@/actions/advertisements/adprice/getAdPriceByAll";

const formSchema = z.object({
	price: z.coerce.number().min(1),
});

type AdPriceFormValues = z.infer<typeof formSchema>;

export default function AdSizePage() {
	const [adPosition, setAdPosition] = useState<Adposition[]>([]);
	const [adBanner, setAdBanner] = useState<Adbanner[]>([]);
	const [adDuration, setAdDuration] = useState<Adduration[]>([]);
	const [adSize, setAdSize] = useState<Adsize[]>([]);
	const [adType, setAdType] = useState<Adtype[]>([]);
	const [adPrice, setAdPrice] = useState<AdPrice[]>([]);
	const [selectedAdBanner, setSelectedAdBanner] = useState<string>("");
	const [selectedAdPosition, setSelectedAdPosition] = useState<string>("");
	const [selectedAdDuration, setSelectedAdDuration] = useState<string>("");
	const [selectedAdType, setSelectedAdType] = useState<string>("");
	const [selectedAdSize, setSelectedAdSize] = useState<string>("");

	const params = useParams();
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	// const nameRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState(false);

	const form = useForm<AdPriceFormValues>({
		resolver: zodResolver(formSchema),
		// defaultValues: {
		//   // name: "",
		//   height: 0,
		//   width: 0,
		// },
	});

	const handleSubmit = async (values: AdPriceFormValues) => {
		try {
			setLoading(true);
			const data = {
				price: values.price,
				AdpositionId: selectedAdPosition,
				AdbannerId: selectedAdBanner,
				AdDurationId: selectedAdDuration,
				AdSizeId: selectedAdSize,
				AdTypeId: selectedAdType,
			};
			console.log("input", data);
			await axios.post(`/api/advertisement/adprice`, data);
			router.refresh();
			// router.push(`/subcategory`);
			// toast.success(toastMessage);
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchAdPositions = async () => {
			const data = await getAdPosition();
			console.log("adPosition", data);
			setSelectedAdPosition(data[0]?.id);
			setAdPosition(data);
		};

		fetchAdPositions();
	}, []);

	useEffect(() => {
		const fetchAdBanners = async () => {
			const data = await getAdBanners();
			console.log("adBanners", data);
			setAdBanner(data);
			setSelectedAdBanner(data[0]?.id);
		};

		fetchAdBanners();
	}, []);
	console.log(selectedAdBanner);

	useEffect(() => {
		const fetchAdDurations = async () => {
			const data = await getAdDurations();
			setSelectedAdDuration(data[0]?.id);
			setAdDuration(data);
		};

		fetchAdDurations();
	}, []);

	useEffect(() => {
		const fetchAdSize = async () => {
			if (selectedAdBanner) {
				const sizes = await getAdsizebyAdBanner(selectedAdBanner);
				console.log("subdata", sizes);
				setSelectedAdSize(sizes[0]?.id);
				// setSelectedSubcategory(subdata[0]?.id);
				setAdSize(sizes);
				// } else {
				// 	const sizes = await getAdSize();
				// 	console.log("all subdata", sizes);
				// 	setAdSize(sizes);
				//   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
			}
		};

		fetchAdSize();
	}, [selectedAdBanner]);

	useEffect(() => {
		const fetchAdType = async () => {
			if (selectedAdBanner) {
				const types = await getAdTypebyAdBanner(selectedAdBanner);
				console.log("subdata", types);
				setSelectedAdType(types[0]?.id);
				// setSelectedSubcategory(subdata[0]?.id);
				setAdType(types);
				// } else {
				//   const sizes = await getAdSize();
				//   console.log("all subdata", sizes);
				//   setAdSize(sizes);
				//   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
			}
		};

		fetchAdType();
	}, [selectedAdBanner]);

	useEffect(() => {
		const fetchAdPrice = async () => {
			if (
				selectedAdBanner &&
				selectedAdPosition &&
				selectedAdDuration &&
				selectedAdSize &&
				selectedAdType
			) {
				const price = await getAdpriceByAll(
					selectedAdBanner,
					selectedAdDuration,
					selectedAdSize,
					selectedAdType,
					selectedAdPosition
				);
				console.log("subdata", price);
				// setSelectedSubcategory(subdata[0]?.id);
				setAdPrice(price);
				// } else {
				//   const sizes = await getAdSize();
				//   console.log("all subdata", sizes);
				//   setAdSize(sizes);
				//   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
			}
		};

		fetchAdPrice();
	}, [
		selectedAdBanner,
		selectedAdPosition,
		selectedAdDuration,
		selectedAdSize,
		selectedAdType,
	]);

	const handleAdPositionChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		console.log(e.target.value);
		setSelectedAdPosition(e.target.value);
	};

	const handleAdBannerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
		setSelectedAdBanner(e.target.value);
	};

	const handleAdDurationChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		console.log(e.target.value);
		setSelectedAdDuration(e.target.value);
	};

	const handleAdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
		setSelectedAdType(e.target.value);
	};
	const handleAdSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
		setSelectedAdSize(e.target.value);
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex justify-between items-center mb-4 lg">
				<h1 className="text-2xl font-semibold">Ad Price</h1>
				{!isEditing && (
					<Button className="flex" onClick={() => setIsEditing(true)}>
						<Plus />
						New
					</Button>
				)}
			</div>

			{isEditing && (
				<div className="mb-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-4 w-full"
						>
							<div className="md:grid gap-8">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											{/* <FormLabel>Name</FormLabel> */}
											<FormControl>
												<Input
													disabled={loading}
													placeholder="Price"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex justify-end">
								<div className="flex gap-2">
									<Button
										disabled={loading}
										className="ml-auto"
										type="submit"
										variant={"success"}
									>
										Save
									</Button>
									<Button
										disabled={loading}
										className="ml-auto"
										variant="destructive"
										type="button"
										onClick={() => setIsEditing(false)}
									>
										Cancel
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<select
					name="category"
					id="category"
					className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
					onChange={handleAdPositionChange}
				>
					{adPosition.length === 0 && (
						<option>No Ad Position Available</option>
					)}
					{adPosition.map((position) => (
						<option
							value={position.id}
							key={position.id}
							className="px-4 py-1"
						>
							{position.name}
						</option>
					))}
				</select>
				<select
					name="category"
					id="category"
					className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
					onChange={handleAdBannerChange}
				>
					{adBanner.length === 0 && (
						<option>No Ad Banner Available</option>
					)}
					{adBanner.map((AdBanner) => (
						<option
							value={AdBanner.id}
							key={AdBanner.id}
							className="px-4 py-1"
						>
							{AdBanner.name}
						</option>
					))}
				</select>
				<select
					name="category"
					id="category"
					className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
					onChange={handleAdDurationChange}
				>
					{adDuration.length === 0 && (
						<option>No Ad Duration Available</option>
					)}
					{adDuration.map((duration) => (
						<option
							value={duration.id}
							key={duration.id}
							className="px-4 py-1"
						>
							{duration.name}
						</option>
					))}
				</select>
				<select
					name="category"
					id="category"
					className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
					onChange={handleAdSizeChange}
				>
					{adSize.length === 0 && (
						<option>No Ad Size Available</option>
					)}
					{adSize.map((size) => (
						<option
							value={size.id}
							key={size.id}
							className="px-4 py-1"
						>
							{size.height} x {size.width}
						</option>
					))}
				</select>
				<select
					name="category"
					id="category"
					className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
					onChange={handleAdTypeChange}
				>
					{adType.length === 0 && (
						<option>No Ad Type Available</option>
					)}
					{adType.map((type) => (
						<option
							value={type.id}
							key={type.id}
							className="px-4 py-1"
						>
							{type.name}
						</option>
					))}
				</select>
			</div>
			{adPrice.length === 0 && <p>No Price Available</p>}
			{adPrice.length > 0 && (
				<div>
					{adPrice.map((price) => (
						<li key={price.id}>{price.price}</li>
					))}
				</div>
			)}
		</div>
	);
}
