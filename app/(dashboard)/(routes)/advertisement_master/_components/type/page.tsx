"use client";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  Adbanner,
  Adsize,
  Adtype,
  Category,
  Subcategory,
} from "@prisma/client";

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
import getAdTypebyAdBanner from "@/actions/advertisements/adtype/getAdTypebyAdBanner";

const formSchema = z.object({
  name: z.string().min(2),
});

type AdTypeFormProps = z.infer<typeof formSchema>;

export default function AdTypePage() {
  const [adBanner, setAdBanner] = useState<Adbanner[]>([]);
  const [adtype, setAdType] = useState<Adtype[]>([]);
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

  const form = useForm<AdTypeFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async () => {
    let name = nameRef.current?.value;

    try {
      setLoading(true);
      const data = {
        name,
        AdBannerId: selectedAdBanner,
      };
      console.log("input", data);
      await axios.post(`/api/advertisement/adtype`, data);
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
    const fetchAdType = async () => {
      if (selectedAdBanner) {
        const types = await getAdTypebyAdBanner(selectedAdBanner);
        console.log("subdata", types);
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

  const handleAdBannerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedAdBanner(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4 lg">
        <h1 className="text-2xl font-semibold">Ad Type</h1>
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
            <div className="grid grid-cols-1 gap-8">
              <Input disabled={loading} placeholder="Type name" ref={nameRef} />
            </div>
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Button
                  disabled={loading}
                  className="ml-auto"
                  type="submit"
                  onClick={handleSubmit}
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
        </div>
      )}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      <div className="">
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800 "
          onChange={handleAdBannerChange}
        >
          {adBanner.length === 0 && <option>No Ad Banners Available</option>}
          {adBanner.map((AdBanner) => (
            <option value={AdBanner.id} key={AdBanner.id} className="px-4 py-1">
              {AdBanner.name}
            </option>
          ))}
        </select>
      </div>
      {adtype.length === 0 && <p>No Type Available</p>}
      {adtype.length > 0 && (
        <div>
          {adtype.map((type) => (
            <li key={type.id}>{type.name}</li>
          ))}
        </div>
      )}
    </div>
  );
}
