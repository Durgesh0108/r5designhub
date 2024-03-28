"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Adbanner } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { getAdBanners } from "@/actions/advertisements/adbanner/getAdbanner";

const formSchema = z.object({
  name: z.string().min(2),
});

type AdBannerFormValue = z.infer<typeof formSchema>;
export default function AdBannerPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [adBanner, setAdBanner] = useState<Adbanner[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<AdBannerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AdBannerFormValue) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post(`/api/advertisement/adbanner`, data);
      router.refresh();
      // toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      // toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAdBanners = async () => {
      const data = await getAdBanners();
      console.log("adbanner", data);
      setAdBanner(data);
    };

    fetchAdBanners();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Ad Banner</h1>
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
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="md:grid gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Banner name"
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
      {adBanner.length === 0 && <p>No Ad Banner Available</p>}
      {adBanner.map((Banner) => (
        <li key={Banner.id}>{Banner.name}</li>
      ))}
    </div>
  );
}
