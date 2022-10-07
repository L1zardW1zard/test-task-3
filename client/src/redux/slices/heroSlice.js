import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmount: 0,
  //currentHero: {},
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroAmount(state, action) {
      state.totalAmount = action.payload;
    },
    incrementHeroAmount(state) {
      state.totalAmount++;
    },
    decrementHeroAmount(state) {
      state.totalAmount--;
    },
  },
});

export const { setHeroAmount, incrementHeroAmount, decrementHeroAmount } =
  heroSlice.actions;

export default heroSlice.reducer;
