import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/random/:query&:count", async (req, res) => {
  const query = req.params.query;
  const count = req.params.count;

  const result = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${process.env.API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data);

  res.json(result);
});

app.listen(PORT, () => {
  console.log("Currently running on http://localhost:" + PORT);
});
