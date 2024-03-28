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
import { Category, Testimonial } from "@prisma/client";
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
import {
  getPendingTestimonial,
  gethiddenTestimonial,
  getshowingTestimonial,
} from "@/actions/getTestimonial";
import Card from "@/components/ui/Card";

const formSchema = z.object({
  review: z.string().min(2),
  userName: z.string().min(2),
  companyName: z.string().min(2),
});

type CategoryFormValues = z.infer<typeof formSchema>;
export default function TestimonialPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [pendingtestimonials, setPendingTestimonials] = useState<Testimonial[]>(
    []
  );
  const [showingTestimonial, setShowingTestimonial] = useState<Testimonial[]>(
    []
  );
  const [hiddenTestimonial, setHiddenTestimonial] = useState<Testimonial[]>([]);

  const [isApproved, setIsApproved] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
      userName: "",
      companyName: "",
    },
  });

  // fetching
  useEffect(() => {
    router.refresh();
    const fetchPendingTestimonial = async () => {
      const data = await getPendingTestimonial();
      // console.log("testimonial", data);
      setPendingTestimonials(data);
    };

    fetchPendingTestimonial();
  }, [isApproved, isShowing]);

  useEffect(() => {
    router.refresh();
    const fetchShowingTestimonial = async () => {
      const data = await getshowingTestimonial();
      // console.log("testimonial", data);
      setShowingTestimonial(data);
    };

    fetchShowingTestimonial();
  }, [isApproved, isShowing]);

  useEffect(() => {
    router.refresh();
    const fetchHiddenTestimonial = async () => {
      const data = await gethiddenTestimonial();
      // console.log("testimonial", data);
      setHiddenTestimonial(data);
    };

    fetchHiddenTestimonial();
  }, [isApproved, isShowing]);

  // actions
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const approveTestimonial = async (id: string) => {
    setIsApproved(true);
    const values = {
      isPending: false,
      isApproved: true,
      show: true,
    };
    await axios.patch(`/api/testimonial/${id}`, values);
    router.push("/testimonial");
    console.log(isApproved);
  };

  const rejectTestimonial = async (id: string) => {
    setIsApproved(false);
    const values = {
      isPending: false,
      isApproved: false,
      show: false,
    };
    await axios.delete(`/api/testimonial/${id}`);
    router.push("/testimonial");
    console.log(isApproved);
  };

  const showTestimonial = async (id: string) => {
    // setIsShowing(true);
    // setIsShowing(false);
    const values = {
      show: true,
    };
    await axios.patch(`/api/testimonial/${id}`, values);
    router.push("/testimonial");
    console.log(isShowing);
  };
  const hideTestimonial = async (id: string) => {
    // setIsShowing(false);
    // setIsShowing(true);
    const values = {
      show: false,
    };
    await axios.patch(`/api/testimonial/${id}`, values);
    router.push("/testimonial");
    console.log(isShowing);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const testimonial = {
        review: data.review,
        companyName: data.companyName,
        userId,
      };
      toggleEdit();
      console.log(testimonial);
      // console.log("current user:", userId);
      await axios.post(`/api/testimonial`, testimonial);
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

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold">Testimonial</h1>
        <hr className="border-1 border-gray-400 " />
        <div className="grid grid-cols-1 gap-8">
          <Card className={"p-8"}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">
                Add a Dummy Testimonial
              </h1>
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
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Name</FormLabel> */}
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Add your review..."
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
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Name</FormLabel> */}
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="User Name"
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
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Name</FormLabel> */}
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="Company Name"
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
                          onClick={toggleEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            {/* {categories.length === 0 && <p>No Categories</p>}
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))} */}
          </Card>
          <Card className="p-4  flex flex-col gap-4">
            {pendingtestimonials.length === 0 && <p>No Pending testimonial</p>}
            {pendingtestimonials.map((testimonial) => (
              <li
                key={testimonial.id}
                className="bg-white shadow-lg border-black border-2 rounded-md p-4"
              >
                <div>
                  <div className="flex justify-between">
                    <h1>{testimonial.userId}</h1>
                    <div className="flex justify-end">
                      <div className="flex gap-4">
                        <Button
                          className=""
                          variant={"success"}
                          onClick={() => approveTestimonial(testimonial.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          className=""
                          variant={"destructive"}
                          onClick={() => rejectTestimonial(testimonial.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                  {testimonial.review}
                </div>
              </li>
            ))}
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-4  flex flex-col gap-4">
              {showingTestimonial.length === 0 && (
                <p>
                  No Testimonial are being shown. Please Show Few Testimonial
                </p>
              )}
              {showingTestimonial.map((testimonial) => (
                <li
                  key={testimonial.id}
                  className="bg-white shadow-lg border-black border-2 rounded-md p-4"
                >
                  <div>
                    <div className="flex justify-between">
                      <h1>{testimonial.userId}</h1>
                      <div className="flex justify-end">
                        <div className="flex gap-4">
                          <Button
                            variant={"destructive"}
                            // onClick={() => hideTestimonial(testimonial.id)}
                            onClick={() => {
                              router.refresh();
                              hideTestimonial(testimonial.id);
                            }}
                          >
                            Hide
                          </Button>
                        </div>
                      </div>
                    </div>
                    {testimonial.review}
                  </div>
                </li>
              ))}
            </Card>
            <Card className="p-4  flex flex-col gap-4">
              {hiddenTestimonial.length === 0 && <p>No Hidden Testimonial</p>}
              {hiddenTestimonial.map((testimonial) => (
                <li
                  key={testimonial.id}
                  className="bg-white shadow-lg border-black border-2 rounded-md p-4"
                >
                  <div>
                    <div className="flex justify-between">
                      <h1>{testimonial.userId}</h1>
                      <div className="flex justify-end">
                        <div className="flex gap-4">
                          <Button
                            variant={"success"}
                            // onClick={() => showTestimonial(testimonial.id)}
                            onClick={() => {
                              router.refresh();
                              showTestimonial(testimonial.id);
                            }}
                          >
                            Show
                          </Button>
                        </div>
                      </div>
                    </div>
                    {testimonial.review}
                  </div>
                </li>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
