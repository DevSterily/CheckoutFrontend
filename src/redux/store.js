import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./stepSlice";
import identificationReducer from "./identificationSlice";
import deliveryReducer from "./deliverySlice";
import paymentReducer from "./paymentSlice";
import summaryReducer from "./summarySlice";

export default configureStore({
  reducer: {
    step: stepReducer,
    identification: identificationReducer,
    delivery: deliveryReducer,
    payment: paymentReducer,
    summary: summaryReducer,
  },
});
