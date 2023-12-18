const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://girija:girija@dashboard.byzthzy.mongodb.net/dashboard",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model("Data", dataSchema);
const jsonData = require(path.join(__dirname, "data", "jsondata.json"));

Data.insertMany(jsonData)
  .then(() => {
    console.log("Data imported into MongoDB");
  })
  .catch((error) => {
    console.error("Error importing data:", error);
  });

app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
