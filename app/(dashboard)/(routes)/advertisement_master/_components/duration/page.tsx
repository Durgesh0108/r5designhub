"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Adduration } from "@prisma/client";
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
import { getAdDurations } from "@/actions/advertisements/adduration/getAdDurations";

const formSchema = z.object({
  name: z.string().min(2),
  value: z.coerce.number().min(1),
});

type AdDurationFormValue = z.infer<typeof formSchema>;
export default function AdDurationPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [adDuration, setAdDuration] = useState<Adduration[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<AdDurationFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: 0,
    },
  });

  const onSubmit = async (data: AdDurationFormValue) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post(`/api/advertisement/adduration`, data);
      // router.refresh();
      // toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      // toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAdDurations = async () => {
      const data = await getAdDurations();
      setAdDuration(data);
    };

    fetchAdDurations();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Ad Duration</h1>
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
                          placeholder="Duration name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:grid gap-8">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Duration Value"
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
        {adDuration.length === 0 && <p>No Ad Duration Available</p>}
        {adDuration.map((Duration) => (
          <li key={Duration.id}>{Duration.name}</li>
        ))}
      </div>
    </div>
  );
}
