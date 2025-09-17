let person = {
    name: "Megan", 
    favoritePet: "Cat", 
    hello: function(n) {
        for (let i = 0; i < 10; i++)
        {
            console.log("Hello")
        }
    }, 
    favoritePet: {
        name: "Buddy", 
        species: "cat"
    }
}

function rollDice(){
    //ceil = if it has any decimal places, go up. floor = if it has any decimal places, go down 
    let randomNumber = Math.floor(Math.random() * 6) + 1; 
    let diceRoleDiv = document.querySelector("#Dice-roll");
    diceRoleDiv.innerHTML += "<div class='Dice-roll'>"+ randomNumber + "</div>";

    //this does the same thing as line 20 
    let newRollDiv = document.createElement("div"); 
    newRollDiv.textContent = randomNumber; 
    newRollDiv.className = "Dice-roll"; 
    diceRollDiv.append(newRollDiv); //Need to add to the other div so it is nested 
}

person.hello(100); 
person.favoritePet.name = "Buddy the elf"; 
console.log(person.favoritePet.name); 

console.log(document); 