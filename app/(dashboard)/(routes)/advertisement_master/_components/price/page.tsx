"use client";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Adbanner, Adposition, Adsize, Category, Subcategory } from "@prisma/client";
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

const formSchema = z.object({
  price: z.coerce.number().min(1),
});

type AdPriceFormValues = z.infer<typeof formSchema>;

export default function AdSizePage() {
  const [adBanner, setAdBanner] = useState<Adbanner[]>([]);
  const [adsize, setAdSize] = useState<Adsize[]>([]);
  const [adPosition, setAdPosition] = useState<Adposition[]>([]);
  const [selectedAdBanner, setSelectedAdBanner] = useState<string>(
    ""
  );
  const [selectedAdPosition, setSelectedAdPosition] = useState<string>(
    ""
  );

  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  // const nameRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const widthRef = useRef<HTMLInputElement>(null);

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
    // let name = nameRef.current?.value;
    let height = heightRef.current?.value;
    let width = widthRef.current?.value;

    try {
      setLoading(true);
      const data = {
        price: values.price,
        // height: values.height,
        // width: values.width,
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
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAdPositions = async () => {
      const data = await getAdPosition();
      console.log("adPosition", data);
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
                  <Button disabled={loading} className="ml-auto" type="submit">
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
      <div>
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
          onChange={handleAdBannerChange}
        >
          {adBanner.length === 0 && <option>No Ad Banner Available</option>}
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
            <li key={size.id}>
              {size.height} x {size.width}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
