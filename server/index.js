import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.API_KEY;

app.get("/random/:query&:count", async (req, res) => {
  const query = req.params.query;
  const count = req.params.count;

  const result = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data);

  res.json(result);
});

app.listen(PORT, () => {
  console.log("Currently running on http://localhost:" + PORT);
});
