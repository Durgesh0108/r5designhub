import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers";

const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
});

export default store;
