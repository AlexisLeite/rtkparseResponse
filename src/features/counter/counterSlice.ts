import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/store";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export const counterReducer = counterSlice.reducer;

export const useCounterSelector = () =>
  useAppSelector((state) => state.counter.value);
