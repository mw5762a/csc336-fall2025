let x = 10; 

console.log(x) 

if (x>10){
    y = x; 
} else {
    y = 0; 
}

console.log(y) 

// Turinary function 
let y = (x > 0) ? y = x : y = 0 

let fruits = () => ["apple", "bannana", "coconut"]

// Take each of the values of the array and put it into a value 
// Array destructuring 
let [fruit1, fruit2, fruit3] = fruits(); 
console.log(fruit1); //will print apple

// same thing as array but with objects 
let person = {
    name: "Megan", 
    job: "professor"
}

let {name, job} = person; 
console.log(job) 

let numbers = [111,11,11,1,11111,2]
numbers.forEach((element, index) => console.log(element)); 

// Will go through each element in array and add 10 to each, will save into new array
// This generates a NEW array - for each will NOT generate new array
let numArray = numbers.map((element => element + 10))