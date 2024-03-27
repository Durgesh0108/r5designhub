"use client";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Adbanner, Adsize, Category, Subcategory } from "@prisma/client";
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

// const formSchema = z.object({
//   name: z.string().min(2),
//   height: z.coerce.number().min(1),
//   width: z.coerce.number().min(1),
//   AdBannerId: z.string().min(1),
// });

// type SubCategoryFormValues = z.infer<typeof formSchema>;

export default function AdSizePage() {
  const [adBanner, setAdBanner] = useState<Adbanner[]>([]);
  const [adsize, setAdSize] = useState<Adsize[]>([]);
  const [selectedAdBanner, setSelectedAdBanner] = useState<string | undefined>(
    ""
  );

  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  // const form = useForm<SubCategoryFormValues>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: "",
  //     height: 0,
  //     width: 0,
  //   },
  // });

  const handleSubmit = async () => {
    let name = nameRef.current?.value;
    let height = heightRef.current?.value;
    let width = widthRef.current?.value;

    try {
      setLoading(true);
      const data = {
        name,
        height,
        width,
        AdBannerId: selectedAdBanner,
      };
      console.log("input", data);
      await axios.post(`/api/advertisement/adsize`, data);
      router.refresh();
      // router.push(`/subcategory`);
      // toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
    } finally {
      name = "";
      setLoading(false);
    }
  };

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
    const fetchAdSize = async () => {
      if (selectedAdBanner) {
        const sizes = await getAdsizebyAdBanner(selectedAdBanner);
        console.log("subdata", sizes);
        // setSelectedSubcategory(subdata[0]?.id);
        setAdSize(sizes);
      } else {
        const sizes = await getAdSize();
        console.log("all subdata", sizes);
        setAdSize(sizes);
        //   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
      }
    };

    fetchAdSize();
  }, [selectedAdBanner]);

  const handleAdBannerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedAdBanner(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4 lg">
        <h1 className="text-2xl font-semibold">Ad Size</h1>
        {!isEditing && (
          <Button className="flex" onClick={() => setIsEditing(true)}>
            <Plus />
            New
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="mb-4">
          <form className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input disabled={loading} placeholder="Size name" ref={nameRef} />
              <Input
                type="number"
                disabled={loading}
                placeholder="Height Value"
                ref={heightRef}
              />
              <Input
                type="number"
                disabled={loading}
                placeholder="Width name"
                ref={widthRef}
              />
            </div>
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Button
                  disabled={loading}
                  className="ml-auto"
                  type="submit"
                  onClick={handleSubmit}
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
        </div>
      )}
      <div>
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
          onChange={handleAdBannerChange}
        >
          {adBanner.map((AdBanner) => (
            <option value={AdBanner.id} key={AdBanner.id} className="px-4 py-1">
              {AdBanner.name}
            </option>
          ))}
        </select>
      </div>
      {adsize.length === 0 && <p>No Size Available</p>}
      {adsize.length > 0 && (
        <div>
          {adsize.map((size) => (
            <li key={size.id}>{size.name}</li>
          ))}
        </div>
      )}
    </div>
  );
}
