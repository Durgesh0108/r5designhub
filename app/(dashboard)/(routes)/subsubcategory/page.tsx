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

export default function SubSubCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    string | undefined
  >("");
  const [subsubcategories, setsubsubcategories] = useState<Subsubcategory[]>(
    []
  );

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
      if (!selectedCategory || !selectedSubcategory) {
        const subsubdata = await getsubsubcategories();
        setsubsubcategories(subsubdata);
      } else {
        const subsubdata = await getsubsubcategory(
          selectedCategory,
          selectedSubcategory
        );
        setsubsubcategories(subsubdata);
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
        <h1 className="text-2xl font-semibold">Sub Sub Category</h1>
        <Link href={"/subsubcategory/new"}>
          <Button className="flex">
            <Plus />
            New
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <select name="category" id="category" onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="category"
            id="category"
            onChange={handleSubCategoryChange}
          >
            {subcategories.length === 0 && (
              <option>Please Select Another Category</option>
            )}
            {subcategories.map((subcategory) => (
              <option value={subcategory.id} key={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
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
