import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
// import style from "../public/css/style.module.css";
import Image from "next/image";
import r5logo from "@/public/img/r5logo.png";
import { Home, HomeIcon } from "lucide-react";
// import "@/public/css/sidebar.css";

const sideBarList = [
  {
    title: "Master",
    paths: [
      {
        name: "Products Category",
        location: "/dashboard/productCategory",
      },
      {
        name: "Services",
        location: "/dashboard/services",
      },
      {
        name: "Advertisement",
        location: "/dashboard/advertisement_master",
      },
      {
        name: "Brands",
        location: "/dashboard/brands",
      },
      {
        name: "Colors",
        location: "/dashboard/colors",
      },
      {
        name: "Size",
        location: "/dashboard/size",
      },
    ],
  },
  {
    title: "Website",
    paths: [
      {
        name: "Testimonial",
        location: "/dashboard/testimonial",
      },
      {
        name: "Advertisement",
        location: "/dashboard/advertisements",
      },
    ],
  },
  {
    title: "Auth",
    paths: [
      {
        name: "Login",
        location: "/dashboard/login",
      },
      {
        name: "Register",
        location: "/dashboard/register",
      },
      {
        name: "Logout",
        location: "/dashboard/logout",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col min-h-screen h-full min-w-fit border border-black p-8  text-white">
        <div className="flex gap-4 items-end">
          <Image src={r5logo} width={50} height={50} alt="R5 Design Hub" />
          <h1 className="mb-2">Admin</h1>
        </div>
        <h1 className="font-bold text-[0.75rem] my-4 ">R5 Design Hub</h1>
        <div className="flex flex-col gap-2">
          {sideBarList.map((item) => (
            <Accordion type="single" collapsible key={item.title}>
              <AccordionItem value="item-1">
                {/* <Home size={32} strokeWidth={1.5} /> */}
                <AccordionTrigger className=" hover:text-yellow-400 ">
                  {item.title}
                </AccordionTrigger>
                {item.paths.map((list) => (
                  <Link href={list.location} key={list.name} className="">
                    <AccordionContent className="before:content-['-'] before:mx-2 hover:ml-6 hover:text-yellow-400 hover:bold transition-all ml-4">
                      {list.name}
                    </AccordionContent>
                  </Link>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
