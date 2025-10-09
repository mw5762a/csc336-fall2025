const fs = require("fs"); //CommonJS module loading 

let programCount = 0; 

try {
    let fileContents = fs.readFileSync("program_count.txt", "utf-8")
    console.log(fileContents)
    programCount = JSON.parse(fileContents) //this is going to make it an integer again 

} catch (error) {
    console.log("Error happened, probably because file doesn't exist.")
    fs.writeFileSunc("program_count.txt", programCount)
}

programCount++ //add to the integer
fs.writeFileSunc("program_count.txt", JSON.stringify(programCount))


// GET = reading data, POST = creating data, PUT = updating data, DELETE = remove data 