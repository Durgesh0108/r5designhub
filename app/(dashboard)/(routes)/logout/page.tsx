"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function LogoutPage() {
  const onLogout = () => {
    console.log("logged out");
    console.log(localStorage);

    localStorage.setItem("token", "loggedout");
  };
  return (
    <div>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}
