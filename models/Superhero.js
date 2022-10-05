import mongoose from "mongoose";

const Superhero = new mongoose.Schema({
  nickname: { type: String, required: true },
  real_name: { type: String },
  origin_description: { type: String },
  superpowers: { type: String },
  catch_phrase: { type: String },
  Images: { type: Array },
});

export default mongoose.model("Superhero", Superhero);
