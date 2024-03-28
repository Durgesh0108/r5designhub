"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category, Subcategory, Subsubcategory } from "@prisma/client";
import { getCategory } from "@/actions/getCategories";
import { getsubcategory } from "@/actions/getSubcategories";
import getsubcatgeorybycategory from "@/actions/getsubcategorybycategory";
import {
  getsubsubcategories,
  getsubsubcategory,
} from "@/actions/getsubsubcategory";

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
import Header from "@/components/ui/header";

const formSchema = z.object({
  name: z.string().min(2),
});

type SubsubCategoryFormValues = z.infer<typeof formSchema>;

export default function SubSubCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subsubcategories, setsubsubcategories] = useState<Subsubcategory[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<SubsubCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: SubsubCategoryFormValues) => {
    try {
      const data = {
        name: values.name,
        categoryId: selectedCategory,
        subcategoryId: selectedSubcategory,
      };
      setLoading(true);
      console.log(data);
      await axios.post(`/api/subsubcategory`, data);
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
      setCategories(data);
      setSelectedCategory(data[0]?.id);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const subdata = await getsubcatgeorybycategory(selectedCategory);
        setSubcategories(subdata);
        setSelectedSubcategory(subdata[0]?.id);
        // } else {
        //   const subdata = await getsubcategory();
        //   setSubcategories(subdata);
        //   setSelectedSubcategory(subdata[0]?.id);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchSubsubcategories = async () => {
      if (selectedCategory && selectedSubcategory) {
        const subsubdata = await getsubsubcategory(
          selectedCategory,
          selectedSubcategory
        );
        setsubsubcategories(subsubdata);
        //   const subsubdata = await getsubsubcategories();
        //   setsubsubcategories(subsubdata);
        // } else {
        //   const subsubdata = await getsubsubcategory(
        //     selectedCategory,
        //     selectedSubcategory
        //   );
        //   setsubsubcategories(subsubdata);
      }
    };

    fetchSubsubcategories();
  }, [selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-semibold">Sub Sub Category</h1> */}
        <Header>Sub Sub Category</Header>
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
                          placeholder="Sub Sub Category name"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring w-full hover:ring-gray-800"
          onChange={handleCategoryChange}
        >
          {categories.length === 0 && <option>No Category Available</option>}
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="category"
          id="category"
          onChange={handleSubCategoryChange}
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
        >
          {subcategories.length === 0 && (
            <option>No Sub Category Available</option>
          )}
          {subcategories.map((subcategory) => (
            <option value={subcategory.id} key={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      {subsubcategories.length === 0 && <p>No Sub Sub Categories</p>}
      {subsubcategories.length > 0 && (
        <div>
          {subsubcategories.map((subcategory) => (
            <li key={subcategory.id}>{subcategory.name}</li>
          ))}
        </div>
      )}
    </div>
  );
}
