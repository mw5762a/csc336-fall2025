// let button = document.querySelector("#callbackDemoButton")

// function clickEventHappened(e){
//     console.log("Clicked!"); 
// }
// button.addEventListener("click", clickEventHappened); 

// //This does the same thing as above with an Aero function! 
// button.addEventListener("click", e => console.log("Clicked!"))

// function doSomething(numTimes){
//     let sum = 0; 
//     for (let i = 0; i < numTimes; i++){
//         sum +=1 * numTimes / 4
//     }
//     return sum; 
// }

// let result = doSomething(5) 
// console.log(result) 

// let dog_request = fetch("https://dog.ceo/api/breeds/image/random") //Says I am done when it recieves a response 

//When only be called when the fetch is complete - AKA asynchronous code
// dog_request
//     .then(response=>{return response.json()}) 
//     .catch(() =>console.log("Something went wrong.")) 
//     .then(dogData=> {
//         let dogImage = document.createElement("img")    
//         dogImage.src = dogData.message 
//         document.querySelector("#dogDiv").appendChild(dogImage)
//     }) 


//This means within here, we are awaiting stuff
// async function getAndDisplayDogImage() {
//     let dogResponse = await fetch("https://dog.ceo/api/breeds/image/random")
//     let dogData = await dogResponse.json
//     let dogImage = document.createElement("img")    
//     dogImage.src = dogData.message 
//     document.querySelector("#dogDiv").appendChild(dogImage)
// }


// This means within here, we are awaiting stuff
async function getAndDisplayCoffeeImage() {
    const coffeeResponse = await fetch("https://api.allorigins.win/raw?url=https://coffee.alexflipnote.dev/random.json");
    let coffeeData = await coffeeResponse.json(); 
    
    let coffeeImage = document.createElement("img");
    coffeeImage.src = coffeeData.file; 
    coffeeImage.width = 400; 

    document.querySelector("#coffeeDiv").appendChild(coffeeImage);
}
async function fetchUpcomingLaunches() {
  try {
    const apiUrl = 'https://llapi.thespacedevs.com/2.0.0/launch/upcoming/?limit=10';
    const proxyUrl = 'https://corsproxy.io/?' + apiUrl;

    const response = await fetch(proxyUrl);
    const textData = await response.text();

    // Parse the JSON returned inside the 'contents' field
    const data = JSON.parse(JSON.parse(textData).contents);
    const launches = data.results;

    const container = document.querySelector('#launches');
    container.innerHTML = '';

    launches.forEach(launch => {
      const launchDiv = document.createElement('div');
      launchDiv.style.marginBottom = '20px';

      const title = document.createElement('h3');
      title.textContent = launch.name;
      launchDiv.appendChild(title);

      const details = document.createElement('p');
      const date = new Date(launch.net).toLocaleString();
      details.innerHTML = `
        <strong>Date:</strong> ${date} <br>
        <strong>Location:</strong> ${launch.pad.name}, ${launch.pad.location.name} <br>
        <strong>Rocket:</strong> ${launch.rocket.configuration.name} <br>
        <strong>Status:</strong> ${launch.status.name} <br>
        <strong>Agency:</strong> ${launch.launch_service_provider.name}
      `;
      launchDiv.appendChild(details);

      container.appendChild(launchDiv);
    });

  } catch (error) {
    console.error('Error fetching launches:', error);
  }
}

fetchUpcomingLaunches();
