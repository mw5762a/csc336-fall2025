let animals = [
    {
        type: "cat", 
        strength: 18, 
        charisma: 17, 
    }, 
    {
        type: "dog", 
        strength: 20, 
        charisma: 12, 
    }, 
    {
        type: "sea horse", 
        strength: 20, 
        charisma: 16, 
    }, 
    {
        type: "rabbit", 
        strength: 7, 
        charisma: 17, 
    }
]; 

function populateAnimalDiv() {
    let animalInfoDiv = document.querySelector("#all-animal-info"); 

    for (let animal of animals)
    {
        let animalHTML = createAnimalDiv(animal); 
        animalInfoDiv.innerHTML += animalHTML  
    }
}

function createAnimalDiv(animal) 
{
    //basically an f string but with a $. This is going to put some HTML code into the site. 
    return `
    <div>
    <h1>${animal.type}</h1>
    <div class = 'stats'>
        <div>Strength :${animal.strength}</div>
        <div>Charisma :${animal.charisma}</div>
    </div>
    </div>`; 
}

let addAnimalForm = document.querySelector("#add-animal-form"); 
addAnimalForm.addEventListener("submit", addNewAnimal); 

function addNewAnimal(event) {
    //MUST have so it doesnt refresh each time you have a button pressed. 
    event.preventDefault(); 

    let typeInput = document.querySelector("#animal-type-field").value; 
    let strengthInput = document.querySelector("#animal-strength-field").value; 
    let charismaInput = document.querySelector("#animal-charisma-field").value; 

    //create new instance of animal with the input fields 
    let newAnimal = [ 
        type = typeInput, 
        strength = strengthInput, 
        charisma = charismaInput
    ]

    //add something to the end of an array in Javascript
    animals.push(newAnimal); 

    //will now add to the html to show on the page (we wrote this function to do that btw)
    populateAnimalDiv(); 

    console.log("Added new animal.")
}