import express from "express";
import fs from "fs";
import cors from "cors"

const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.use(cors())

// when there is an HTTP call to world, this is going to run 
app.get("/world", async (req, res) => {
    const dataString = await fs.readFileSync("world.json", "utf-8");
    const dataObject = JSON.parse(dataString);
    res.json(dataObject); //express object that send back a response to the server side (e.g. /world)
});

app.post("/update", async (req, res) => {
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    const world = JSON.parse(worldData);

    const townToUpdate = req.body.selectedOption;
    console.log(townToUpdate)

    let newPopulation = 5

    // add 5 people to the population of the users selected town 
    for (let region of world.regions) {       
        for (let town of region.towns) {    
            if (town.name === townToUpdate) {
                town.population += newPopulation; 
            }
        }
    }

    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    res.json(world);
});

app.listen(3000, () => console.log("Server running on http://localhost:3001"));