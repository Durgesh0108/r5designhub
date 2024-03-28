"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Brands, Category, Subcategory, Subsubcategory } from "@prisma/client";
import { getCategory } from "@/actions/getCategories";
import { getsubcategory } from "@/actions/getSubcategories";
import getsubcatgeorybycategory from "@/actions/getsubcategorybycategory";
import { getsubsubcategory } from "@/actions/getsubsubcategory";
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
import ImageUpload from "@/components/ui/image-upload";
import { getBrandsBycategories } from "@/actions/brands/getBrandsByCategories";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Header from "@/components/ui/header";

const formSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().min(2),
});

type BrandsFormValues = z.infer<typeof formSchema>;

export default function BrandsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subsubcategories, setsubsubcategories] = useState<Subsubcategory[]>(
    []
  );
  const [brands, setBrands] = useState<Brands[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSubsubcategory, setSelectedSubsubcategory] =
    useState<string>("");

  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<BrandsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BrandsFormValues) => {
    try {
      const data = {
        name: values.name,
        imageUrl: values.imageUrl,
        categoryId: selectedCategory,
        subcategoryId: selectedSubcategory,
        subsubcategoryId: selectedSubsubcategory,
      };
      setLoading(true);
      console.log(data);
      await axios.post(`/api/brands`, data);
      // router.refresh();
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
      } else {
        const subdata = await getsubcategory();
        setSubcategories(subdata);
        setSelectedSubcategory(subdata[0]?.id);
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
        setSelectedSubsubcategory(subsubdata[0]?.id);
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

  useEffect(() => {
    const fetchBrands = async () => {
      if (selectedSubsubcategory) {
        const data = await getBrandsBycategories(selectedSubsubcategory);
        console.log(data);
        setBrands(data);
      }
      // setSelectedCategory(data[0]?.id);
    };

    fetchBrands();
  }, [selectedSubsubcategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSubsubCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubsubcategory(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-semibold">Brands</h1> */}
        <Header>Brands</Header>
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
              {/* <div className="grid grid-cols-1 md:grid-cols-2"> */}
              <div className="md:grid gap-8">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          disabled={loading}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:grid gap-8 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Name</FormLabel> */}
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Brand name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* </div> */}

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
      {/* </Card> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
          onChange={handleCategoryChange}
        >
          {categories.length === 0 && <option>No Category Available</option>}
          {categories.map((category) => (
            <option value={category.id} key={category.id} className="px-4 py-1">
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
          onChange={handleSubCategoryChange}
        >
          {subcategories.length === 0 && (
            <option>No Sub Category Available</option>
          )}
          {subcategories.map((category) => (
            <option value={category.id} key={category.id} className="px-4 py-1">
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="category"
          id="category"
          className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
          onChange={handleSubsubCategoryChange}
        >
          {subsubcategories.length === 0 && (
            <option>No Sub Sub Category Available</option>
          )}
          {subsubcategories.map((category) => (
            <option value={category.id} key={category.id} className="px-4 py-1">
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 mt-8">
        {brands.length === 0 && <p>No Brands Available</p>}
        {brands.map((brand) => (
          <div key={brand.id}>
            <h1>{brand.name}</h1>
            <Image
              src={brand.imageUrl}
              height={100}
              width={100}
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
