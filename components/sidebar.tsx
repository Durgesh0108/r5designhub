import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import style from "../public/css/style.module.css";
import Image from "next/image";
import r5logo from "@/public/img/r5logo.png";

const sideBarList = [
  {
    title: "Website",
    paths: [
      {
        name: "Testimonial",
        location: "/testimonial",
      },
      {
        name: "Advertisement",
        location: "/advertisements",
      },
    ],
  },
  {
    title: "Master",
    paths: [
      {
        name: "Products Category",
        location: "/productCategory",
      },
      {
        name: "Services",
        location: "/services",
      },
      {
        name: "Advertisement",
        location: "/advertisement_master",
      },
      {
        name: "Brands",
        location: "/brands",
      },
      {
        name: "Colors",
        location: "/colors",
      },
      {
        name: "Size",
        location: "/size",
      },
    ],
  },
  {
    title: "Auth",
    paths: [
      {
        name: "Login",
        location: "/login",
      },
      {
        name: "Register",
        location: "/register",
      },
      {
        name: "Logout",
        location: "/logout",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col min-h-screen h-full min-w-fit border border-black p-8  text-white">
      <div>
        <Image src={r5logo} width={50} height={50} alt="R5 Design Hub" />
      </div>
      <h1 className="font-bold text-3xl mb-4">Master</h1>
      <div className="flex flex-col gap-2">
        {/* <Link href={"/productCategory"}>Product Category</Link>
        <Link href={"/category"}>Category</Link>
        <Link href={"/subcategory"}>Subcategory</Link>
        <Link href={"/subsubcategory"}>Subsubcategory</Link> */}
        {sideBarList.map((item) => (
          <Accordion type="single" collapsible key={item.title}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{item.title}</AccordionTrigger>
              {item.paths.map((list) => (
                <Link href={list.location} key={list.name}>
                  <AccordionContent className="hover:ml-2 hover:text-yellow-400 hover:bold transition-all">
                    {list.name}
                  </AccordionContent>
                </Link>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
        {/* <div className="deznav">
          <div className="deznav-scroll">
            <h1 className="menu-title">YOUR COMPANY</h1>
            <ul className="metismenu" id="menu">
              {sideBarList.map((item) => (
                <li>
                  <a
                    className="has-arrow "
                    href="javascript:void(0);"
                    aria-expanded="false"
                  >
                    <div className="menu-icon">
                      <svg
                        width="24"
                        height="24"
                        // viewbox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.756 22 16.0829 22H18.0438C18.9596 22.0024 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
                          fill="#90959F"
                        ></path>
                      </svg>
                    </div>
                    <span className="nav-text">{item.title}</span>
                  </a>
                  <ul aria-expanded="false">
                    {item.paths.map((path) => (
                      <li key={path.location}>
                        <Link href={path.location}>{path.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
