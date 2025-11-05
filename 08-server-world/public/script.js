
let data; 
let people = {}

async function loadWorld() {
    const res = await fetch("/world");
    data = await res.json(); 

    let html = "<ul>";

    for (let region of data.regions) {
        html += `<li>Region: ${region.name}<ul>`;
        for (let town of region.towns) {
            html += `<li>Town: ${town.name} (Population: ${town.population})</li>`;
        }
        html += "</ul></li>";
    }
    html += "</ul>";

    document.getElementById("worldDiv").innerHTML = html;
}

loadWorld();

async function setup() {
    console.log("p5 set up!")
    await loadWorld() 

    // loop through JSON file for each of the fields 
    for (let region of data.regions) {
        for (let town of region.towns) {
            for (let person of town.notable_people)
            people[person.name] = new Person(person)
            console.log(town.name)
        }
    }
    createCanvas(800,600)
    colorMode(HSB); 
}


function draw() {
    background(frameCount%360, 100, 100)
    for (let name in people) {
        let person = people[name]
        person.update() 
    }
}

let nameForm = document.querySelector("#nameForm");

nameForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let formData = new FormData(nameForm);
    let formDataInObjectForm = Object.fromEntries(formData.entries());

    console.log(formDataInObjectForm)
    const res = await fetch("/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataInObjectForm)
    });

    const updatedWorld = await res.json();
    loadWorld();
});