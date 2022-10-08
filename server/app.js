import express from "express";
import mongoose from "mongoose";
import router from "./routers/SuperheroRouter.js";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "static");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/api", router);
app.use("/static", express.static("static"));

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`listening port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ url: `/static/${req.file.originalname}` });
});

startApp();
