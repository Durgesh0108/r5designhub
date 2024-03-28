// "use client";

import Sidebar from "@/components/sidebar";
import React from "react";
import { Provider } from "react-redux";
import store from "@/store";

interface layoutProps {
  children: React.ReactNode;
}

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Provider store={store}>
    <div className="flex">
      <div className="bg-[#222b40] w-3/12">
        {/* <div className="w-3/12"> */}
        <Sidebar />
      </div>
      <div className="p-4 w-full bg-[#ebe7de]">{children}</div>
    </div>
    // </Provider>
  );
}
