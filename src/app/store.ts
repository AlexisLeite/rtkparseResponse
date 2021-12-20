import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterReducer, counterSlice } from "../features/counter/counterSlice";
import dogSlices from "../features/dog/dogSlices";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dog: dogSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
