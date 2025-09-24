//Passes in event "e"
// function buttonClicked(e) {
//     console.log("Button clicked!"); 
// }

console.log("HELLO"); 
let myButton = document.getElementById("my-button"); 

// Scope of an arrow function is different that a regular function 
myButton.addEventListener("click", (e) => console.log(this)); 

class Person {
    // same as the __Init__
    constructor(){
        this.name = this.name; 
    }

    // function inside of the class Person  
    myName(howManyTimes) {
        for (let i = 0; i < howManyTimes; i++)
        {
            console.log("Hello my name is", this.name)
        }
    }   
} 
// Instantiate an object from a class 
let megan = Person("Megan"); 
megan.sayHello(10); 

// Storing a user to local storage 
localStorage.setItem("user", "megan"); 
console.log(localStorage.getItem("user")); 

// Returns {"name": "Megan"}
let meganInString = JSON.stringify(megan); 

// How to parse a string that is gotten back into a js object 
let meganObject = JSON.parse(meganInString); 

// Making a canvas and adding elements to it 
const canvas = document.querySelector("#myCanvas"); 
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'skyblue'; 
ctx.fillRect(50,50,100,75); 