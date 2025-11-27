import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/weeks", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./weeksData.json", "utf8"));
  res.json(data);
});

app.listen(3001, () => console.log("Server running on port 3001"));
