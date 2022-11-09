import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentPage: 1,
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

export const fetchHeroes = createAsyncThunk("hero/fetchHeroes", async (currentPage) => {
  try {
    const { data } = await axios.get(`/api/superheroes/?page=${currentPage}`);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
});

export const fetchOneHeroById = createAsyncThunk("hero/fetchOneHeroById", async (id) => {
  try {
    const { data } = await axios.get("/api/superhero/" + id);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
});

export const deleteHero = createAsyncThunk("hero/deleteHero", async (id) => {
  try {
    const { data } = await axios.delete("/api/superhero/" + id);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
});

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
    decTotalAmount(state) {
      state.totalAmount--;
    },
    incTotalAmount(state) {
      state.totalAmount++;
    },
  },
  extraReducers: {
    [fetchHeroes.fulfilled]: (state, action) => {
      state.items = action.payload.superheroes;
      state.totalAmount = action.payload.totalAmount;
    },
    [fetchOneHeroById.fulfilled]: (state, action) => {
      state.selectedHero = action.payload;
    },
    [deleteHero.fulfilled]: (state) => {
      state.totalAmount--;
    },
  },
});

export const { setTotalAmount, decTotalAmount, incTotalAmount, setDefaultHero, setCurrentPage } = heroSlice.actions;

export default heroSlice.reducer;
