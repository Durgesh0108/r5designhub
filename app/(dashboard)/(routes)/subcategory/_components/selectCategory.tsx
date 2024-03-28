"use client";

import prismadb from "@/lib/prisma";
import { categoryActions } from "@/store/reducers";
import React from "react";
import { useDispatch } from "react-redux";

export default function SelectCategory() {
  const dispatch = useDispatch();
  // const handleChange = (event) => {
  //   console.log("handleChange");
  //   console.log(event.target.value);

  //   dispatch(categoryActions.setCategoryId(event.target.value));
  // };

  const categories = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
  ];

  return (
    <div>
      {/* <select name="category" id="category" onChange={handleChange}>
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.value}
          </option>
        ))}
      </select> */}
    </div>
  );
}
