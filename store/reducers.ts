import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    sub_subcategroies: [],
    sub_categoryId: "",
    subsub_categoryId: "",
    subsub_subcategoryId: "",
  },
  reducers: {
    setCategoryId(state, actions) {
      // console.log(actions.payload.categoryId);
      state.sub_categoryId = actions.payload.categoryId;
    },
    setsubCategory(state, actions) {
      console.log(actions.payload.subcategories);
      state.sub_subcategroies = actions.payload.subcategories;
    },
  },
});

const categoryReducer = categorySlice.reducer;

export const categoryActions = categorySlice.actions;
export default categoryReducer;
