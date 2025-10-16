import express from "express"
import fs from "fs" 

console.log("hello world"); 

const app = express(); //name of the express object for their server 

app.use(express.static("./public")); //folder where you keep your static files
app.use(express.json()) //allows us to send JSON over easily 

//route = parts that follow the URL you are going to (e.g. /api/random_number)
app.get("/api/random_number", (req,res) => { //req and res have a header and a body 
    res.send(Math.random()) // sends back string with random number 
}); 

app.post("/api/add", (req, res) => {
    console.log(req.body.name) //this will give us the JSON field for name that was sent over 
    req.body.name += "!!!"
    
    //send things back over to the client 
    res.json(req.body)
    res.send("It worked!") 
})

app.listen(3000); //port that the server needs to listen on 
