// "use client";

// import { Button } from "@/components/ui/button";
// import prismadb from "@/lib/prisma";
// import { Plus } from "lucide-react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import SelectCategory from "./_components/selectCategory";
// import SubCategoryList from "./_components/SubCategoryList";
// import { Category, Subcategory } from "@prisma/client";
// import { getCategory } from "@/actions/getCategories";
// import { getsubcategory } from "@/actions/getSubcategories";
// import getsubcatgeorybycategory from "@/actions/getsubcategorybycategory";

// export default function SubcategoryPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
//     ""
//   );
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const data = await getCategory();
//       console.log("categories", data);
//       setCategories(data);
//       setSelectedCategory(data[0]?.id);
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       if (selectedCategory) {
//         const subdata = await getsubcatgeorybycategory(selectedCategory);
//         console.log("subdata", subdata);
//         // setSelectedSubcategory(subdata[0]?.id);
//         setSubcategories(subdata);
//         // } else {
//         //   const subdata = await getsubcategory();
//         //   console.log("subdata", subdata);
//         //   setSubcategories(subdata);
//         //   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
//       }
//     };

//     fetchSubcategories();
//   }, [selectedCategory]);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     console.log(e.target.value);
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <div className="flex flex-col gap-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold">Sub Category</h1>
//         <Link href={"/subcategory/new"}>
//           <Button className="flex">
//             <Plus />
//             New
//           </Button>
//         </Link>
//       </div>
//       <div>
//         <select name="category" id="category" onChange={handleCategoryChange}>
//           {categories.map((category) => (
//             <option value={category.id} key={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {subcategories.length === 0 && <p>No Sub Categories</p>}
//       {subcategories.length > 0 && (
//         <div>
//           {subcategories.map((subcategory) => (
//             <li key={subcategory.id}>{subcategory.name}</li>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Category, Subcategory } from "@prisma/client";
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

const formSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().min(1),
});

type SubCategoryFormValues = z.infer<typeof formSchema>;

interface SubCategoryFormProps {
  categories: Category[];
}

export default function SubcategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );

  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const inputref = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const form = useForm<SubCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async () => {
    let name = inputref.current?.value;

    try {
      setLoading(true);
      const data = {
        name,
        categoryId: selectedCategory,
      };
      console.log("input", data);
      await axios.post(`/api/subcategory`, data);
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
    const fetchCategories = async () => {
      const data = await getCategory();
      console.log("categories", data);
      setCategories(data);
      setSelectedCategory(data[0]?.id);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const subdata = await getsubcatgeorybycategory(selectedCategory);
        console.log("subdata", subdata);
        // setSelectedSubcategory(subdata[0]?.id);
        setSubcategories(subdata);
        // } else {
        //   const subdata = await getsubcategory();
        //   console.log("subdata", subdata);
        //   setSubcategories(subdata);
        //   setSelectedSubcategory(subdata[0]?.id); // Select the first subcategory by default
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4 lg">
        <h1 className="text-2xl font-semibold">Sub Category</h1>
        {!isEditing && (
          <Button className="flex" onClick={() => setIsEditing(true)}>
            <Plus />
            New
          </Button>
        )}
      </div>
      {/* {isEditing && (
        <div>
          <form action="">
            <Input
              placeholder="Subcategory Name..."
              disabled={loading}
              ref={inputref}
            />
            <div className="flex gap-2">
              <Button
                disabled={loading}
                className="ml-auto"
                type="submit"
                onClick={handleSubmit}
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
          </form>
        </div>
      )} */}
      {isEditing && (
        <div className="mb-4">
          <form className="space-y-4 w-full">
            <div className="md:grid gap-8">
              <Input
                disabled={loading}
                placeholder="Sub Category name"
                ref={inputref}
              />
            </div>
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Button
                  disabled={loading}
                  className="ml-auto"
                  type="submit"
                  onClick={handleSubmit}
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
      <div>
        <select
          name="category"
          id="category"
          className="border-2 p-2 rounded-lg hover:ring hover:ring-gray-800 "
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id} className="px-4 py-1">
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {subcategories.length === 0 && <p>No Sub Categories</p>}
      {subcategories.length > 0 && (
        <div>
          {subcategories.map((subcategory) => (
            <li key={subcategory.id}>{subcategory.name}</li>
          ))}
        </div>
      )}
    </div>
  );
}
