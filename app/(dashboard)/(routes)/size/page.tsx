"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getCategory } from "@/actions/getCategories";
import { Category, Colors, Size } from "@prisma/client";
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
import { getSizeByCategory } from "@/actions/sizes/getSizeByCategory";

const formSchema = z.object({
  name: z.string().min(2),
});

type SizeFormValues = z.infer<typeof formSchema>;
export default function SizePage() {
  const params = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );

  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: SizeFormValues) => {
    try {
      const data = {
        name: values.name,
        categoryId: selectedCategory,
      };
      setLoading(true);
      console.log(data);
      await axios.post(`/api/sizes`, data);
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
      const data = await getCategory();
      console.log("categories", data);
      setCategories(data);
      setSelectedCategory(data[0]?.id);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      if (selectedCategory) {
        const subdata = await getSizeByCategory(selectedCategory);
        console.log("subdata", subdata);
        // setSelectedSubcategory(subdata[0]?.id);
        setSizes(subdata);
        // } else {
        //   const subdata = await getsubcategory();
        //   console.log("subdata", subdata);
        //   setSubcategories(subdata);
        //   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
      }
    };

    fetchSizes();
  }, [selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-extrabold">Sizes</h1>
      <hr className="border-1 border-gray-400 " />
      <div className="grid grid-cols-1  gap-8">
        <Card className={"p-8"}>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Add a Size</h1>
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
                                  placeholder="Size name"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="category"
                id="category"
                className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
                onChange={handleCategoryChange}
              >
                {categories.length === 0 && (
                  <option>No Category Available</option>
                )}
                {categories.map((category) => (
                  <option
                    value={category.id}
                    key={category.id}
                    className="px-4 py-1"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              {sizes.length === 0 && <p>No Sizes</p>}
              {sizes.map((size) => (
                <div key={size.id}>
                  <span>{size.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
