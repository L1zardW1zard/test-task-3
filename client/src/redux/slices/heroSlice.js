import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  totalAmount: 0,
  items: [],
  selectedHero: {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [],
  },
};

export const fetchHeroes = createAsyncThunk(
  "hero/fetchHeroes",
  async (currentPage) => {
    const { data } = await axios.get(`/api/superheroes/?page=${currentPage}`);
    return data;
  }
);

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
    setItems(state, action) {
      state.items = action.payload;
    },
    setSelectedHero(state, action) {
      state.selectedHero = action.payload;
    },
    setHeroNickname(state, action) {
      state.selectedHero.nickname = action.payload;
    },
    setHeroRealName(state, action) {
      state.selectedHero.real_name = action.payload;
    },
    setHeroOriginDescription(state, action) {
      state.selectedHero.origin_description = action.payload;
    },
    setHeroSuperpowers(state, action) {
      state.selectedHero.superpowers = action.payload;
    },
    setHeroCatchPhrase(state, action) {
      state.selectedHero.catch_phrase = action.payload;
    },
    setHeroImages(state, action) {
      state.selectedHero.images = action.payload;
    },
    setDefaultHero(state) {
      state.selectedHero = {
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
        images: [],
      };
    },
  },
  extraReducers: {
    [fetchHeroes.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  setHeroAmount,
  incrementHeroAmount,
  decrementHeroAmount,
  setItems,
  setSelectedHero,
  setHeroNickname,
  setHeroRealName,
  setHeroOriginDescription,
  setHeroSuperpowers,
  setHeroCatchPhrase,
  setHeroImages,
  setDefaultHero,
} = heroSlice.actions;

export default heroSlice.reducer;
