import express from "express";
import mongoose from "mongoose";
import router from "./routers/SuperheroRouter.js";
import multer from "multer";

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

const PORT = process.env.PORT || 5000;
const DB_URL =
  "mongodb+srv://test-task-3:root@cluster0.9c4gdf4.mongodb.net/?retryWrites=true&w=majority";

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
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
