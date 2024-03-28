// "use client";

// import * as z from "zod";
// import axios from "axios";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// // import { toast } from "react-hot-toast";
// import { Trash } from "lucide-react";
// import { Category, Subcategory } from "@prisma/client";
// import { useParams, useRouter } from "next/navigation";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import prismadb from "@/lib/prisma";

// const formSchema = z.object({
//   name: z.string().min(2),
//   categoryId: z.string().min(2),
//   subcategoryId: z.string().min(2),
// });

// type SubSubCategoryForm = z.infer<typeof formSchema>;

// interface SubSubCategoryProps {
//   categories: Category[];
//   subcategories: Subcategory[];
// }

// export const SubSubCategoryForm: React.FC<SubSubCategoryProps> = ({
//   categories,
//   subcategories,
// }) => {
//   const params = useParams();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const form = useForm<SubSubCategoryForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//     },
//   });

//   const onSubmit = async (data: SubSubCategoryForm) => {
//     try {
//       setLoading(true);
//       console.log(data);
//       // await axios.post(`/api/${params.storeId}/categories`, data);
//       // router.refresh();
//       // router.push(`/categories`);
//       // toast.success(toastMessage);
//     } catch (error: any) {
//       console.log(error);
//       // toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(
//         `/api/${params.storeId}/categories/${params.categoryId}`
//       );
//       router.refresh();
//       router.push(`/${params.storeId}/categories`);
//       // toast.success("Category deleted.");
//     } catch (error: any) {
//       console.log(error);
//       // toast.error(
//       // 	"Make sure you removed all products using this category first."
//       // );
//       // } finally {
//       setLoading(false);
//       // setOpen(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         Create a New Category
//       </div>
//       <Separator />
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 w-full"
//         >
//           <div className="md:grid md:grid-cols-3 gap-8">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Category name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="categoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Category</FormLabel>
//                   <Select
//                     disabled={loading}
//                     onValueChange={field.onChange}
//                     value={field.value}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue
//                           defaultValue={field.value}
//                           placeholder="Select a Category"
//                         />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {categories.map((category) => (
//                         <SelectItem
//                           key={category.id}
//                           value={category.id}
//                           // onClick={() => {
//                           //   localStorage.setItem("categoryId", category.id);
//                           // }}
//                           onChange={() => {
//                             localStorage.setItem("categoryId", category.id);
//                           }}
//                         >
//                           {category.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="subcategoryId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Sub Category</FormLabel>
//                   <Select
//                     disabled={loading}
//                     onValueChange={field.onChange}
//                     value={field.value}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue
//                           defaultValue={field.value}
//                           placeholder="Select a Category"
//                         />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {subcategories.map((subcategory) => (
//                         <SelectItem key={subcategory.id} value={subcategory.id}>
//                           {subcategory.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button disabled={loading} className="ml-auto" type="submit">
//             Save
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// };

"use client";

import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Category, Subcategory } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prisma";

const formSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().min(2),
  subcategoryId: z.string().min(2),
});

type SubSubCategoryForm = z.infer<typeof formSchema>;

interface SubSubCategoryProps {
  categories: Category[];
  subcategories: Subcategory[];
  // categoryId: (data:string) => void;
}

export const SubSubCategoryForm: React.FC<SubSubCategoryProps> = ({
  categories,
  subcategories,
  // categoryId,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onCategoryChange = (category_id: string) => {
    console.log(category_id);
  };

  const form = useForm<SubSubCategoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: SubSubCategoryForm) => {
    try {
      setLoading(true);
      console.log(data);
      await axios.post(`/api/subsubcategory`, data);
      router.refresh();
      router.push(`/subsubcategory`);
      // toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      // toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      // toast.success("Category deleted.");
    } catch (error: any) {
      console.log(error);
      // toast.error(
      // 	"Make sure you removed all products using this category first."
      // );
      // } finally {
      setLoading(false);
      // setOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        Create a New Category
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Category"
                          onClick={() => {
                            console.log("First");
                            console.log(field.value);
                          }}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          onClick={() => {
                            console.log("second");
                            console.log(field.value);
                          }}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};
