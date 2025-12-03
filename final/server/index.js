import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static("public")); 

function loadVotes() {
  return JSON.parse(fs.readFileSync("./votingResults.json", "utf8"));
}

function saveVotes(votes) {
  fs.writeFileSync("./votingResults.json", JSON.stringify(votes, null, 2));
}

app.get("/api/votes", (req, res) => {
  try {
    const storedVotes = loadVotes();
    res.json(storedVotes);
  } catch (err) {
    console.error("GET /api/votes failed:", err);
    res.status(500).json({ error: "Failed to load votes" });
  }
});

app.post("/api/votes", (req, res) => {
  const newVotes = req.body.votes;  
  console.log(newVotes)  
  let storedVotes = loadVotes();

  newVotes.forEach(vote => {
    const existing = storedVotes.find(v => v.id === vote.id);
    if (existing) {
      existing.votes += vote.votes;
    }
  });

  saveVotes(storedVotes);
  res.json(storedVotes);
});

app.listen(3001, () => console.log("Server running on port 3001"));
