"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getCategory } from "@/actions/getCategories";
import { Category, Colors } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import Card from "@/components/ui/Card";
import { getColors } from "@/actions/colors/getColors";

const formSchema = z.object({
  name: z.string().min(2),
  hexcode: z.string().min(2),
});

type ColorFormValues = z.infer<typeof formSchema>;
export default function ColorsPage() {
  const params = useParams();
  const router = useRouter();

  const [colors, setColors] = useState<Colors[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hexcode: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post(`/api/colors`, data);
      router.refresh();
      // router.push(`/category`);
      // toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      // toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getColors();
      setColors(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Colors</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1  gap-8">
        <Card className={"p-8"}>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Add a Color</h1>
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
                    className="space-y-4 w-full "
                  >
                    <div className="grid grid-cols-2 gap-4">
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
                                  placeholder="Color name"
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
                          name="hexcode"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Name</FormLabel> */}
                              <FormControl>
                                <Input
                                  disabled={loading}
                                  placeholder="Color Hexcode"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="flex gap-2">
                        <Button
                          disabled={loading}
                          className="ml-auto"
                          type="submit"
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
            <div className="flex flex-col gap-2">
              {colors.length === 0 && <p>No Colors</p>}
              {colors.map((color) => (
                <div key={color.id} className="flex items-center gap-3">
                  <div
                    className="rounded-full w-6 h-6 border-black border-2"
                    style={{ backgroundColor: `${color.hexcode}` }}
                  ></div>
                  <span>{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
