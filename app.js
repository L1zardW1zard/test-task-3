import express from "express";
import mongoose from "mongoose";
import router from "./SuperheroRouter.js";

const app = express();

app.use(express.json());
app.use("/api", router);

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

startApp();
