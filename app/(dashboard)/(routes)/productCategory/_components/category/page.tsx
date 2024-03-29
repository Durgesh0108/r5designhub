// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import { getCategory } from "@/actions/getCategories";
// import { Category } from "@prisma/client";

// export default function CategoryPage() {
//   const [categories, setCategories] = useState<Category[]>([]);

//   const [isEditing, setIsEditing] = useState(false);
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const data = await getCategory();
//       setCategories(data);
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1>Category</h1>

//         <Link href={"/category/new"}>
//           <Button className="flex" onClick={() => setIsEditing(true)}>
//             <Plus />
//             New
//           </Button>
//         </Link>
//       </div>

//       {categories.length === 0 && <p>No Categories</p>}
//       {categories.map((category) => (
//         <li key={category.id}>{category.name}</li>
//       ))}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getCategory } from "@/actions/getCategories";
import { Category } from "@prisma/client";
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

type CategoryFormValues = z.infer<typeof formSchema>;
export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post(`/api/category`, data);
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
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-semibold">Category</h1> */}
        <Header>Category</Header>
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
                          placeholder="Category name"
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
        {categories.length === 0 && <p>No Categories</p>}
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </div>
    </div>
  );
}
