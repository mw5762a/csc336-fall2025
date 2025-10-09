import express from "express"

const app = express() 
const PORT = 3000; 
let count = 0; 

// starts the server on a specific port 
app.listen(PORT, (req, res) => {
    console.log("Server started!")
}); 

// Now if you go on the computer and say localhost:3000/test this will get called 
app.get("/test", (req,res) => {
    console.log("Someone made a get request with the 'test' endpoint")
    count ++ 
    res.send("Hi there! This is the server spreaking!" + count)
}); 