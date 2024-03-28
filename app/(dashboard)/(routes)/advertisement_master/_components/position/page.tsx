"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Adbanner, Adposition } from "@prisma/client";
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
import { getAdPosition } from "@/actions/advertisements/adposition/getAdPosition";

const formSchema = z.object({
  name: z.string().min(2),
});

type AdPositionFormValue = z.infer<typeof formSchema>;
export default function AdPositionPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [adPosition, setAdPosition] = useState<Adposition[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<AdPositionFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AdPositionFormValue) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post(`/api/advertisement/adposition`, data);
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
    const fetchAdPositions = async () => {
      const data = await getAdPosition();
      console.log("adPosition", data);
      setAdPosition(data);
    };

    fetchAdPositions();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Ad Position</h1>
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
                          placeholder="Position name"
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
                  <Button disabled={loading} className="ml-auto" type="submit" variant={"success"}>
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
        {adPosition.length === 0 && <p>No Ad Position Available</p>}
        {adPosition.map((Position) => (
          <li key={Position.id}>{Position.name}</li>
        ))}
      </div>
    </div>
  );
}
