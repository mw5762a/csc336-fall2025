const fs = require("fs"); //fs = file system, a library that comes with node using "CommonJS"

let randomNumbers = []; 

//Read file in 
let fileContents = fs.readFileSync("./randomNumbers.txt", "utf8"); 
randomNumbers = JSON.parse(fileContents) //will turn it back into the correct data structure (list) 
console.log(randomNumbers[0])


for (let i = 0; i < 10; i++ ){
    let rand = Math.random(); 
    randomNumbers[i] = rand; 
}

// Write file 
fs.writeFileSync("randomNumbers.txt", JSON.stringify(randomNumbers)) //turns random numbers into string based representation
