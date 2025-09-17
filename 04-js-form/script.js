let marinersStats = {
    "2021":{
        year: 2021, 
        stats: '77-85 (47% Wins)', 
        funFact: "Despite finishing below .500, the team had several standout rookie performances!",    
        img: "salmon_images/2024_mariners.jpg", 
    }, 
    "2022": {
        year: 2022, 
        stats: '74-88 (46% Wins)', 
        funFact: "The Mariners hosted the All-Star Game this year!",
        img: "salmon_images/2023_mariners.jpg" 
    }, 
    "2023": {
        year: 2023, 
        stats: '90-72 (56% Wins)', 
        funFact: "The team made the playoffs for the first time in 21 years!",
        img: "salmon_images/2021_mariners.jpg"
    }, 
    "2024": {
        year: 2024, 
        stats: '77-90 (46% Wins)', 
        funFact: "A mid-season managerial change sparked a strong finish! This was also the year the salmon race was started.",
        img: "salmon_images/2024_mariners.jpg"
    }, 

    "2025": {
        year: 2025, 
        stats: '55', 
        statsPredicted: "",
        moreWins: ""
}
}

function showInfo(id) {
    let container = document.getElementById("info-box-container");
    
    let existingBox = container.querySelector(".info-box");
    
    if (existingBox) {
        existingBox.innerHTML = `
            <b>${marinersStats[id].year}:</b> ${marinersStats[id].stats}<br>
            <b>Fun Fact:</b> ${marinersStats[id].funFact}<br>
            <img src="${marinersStats[id].img}" alt="Mariners ${marinersStats[id].year}">
        `;

    } else {
        let infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        infoBox.innerHTML = `
            <b>${marinersStats[id].year}:</b> ${marinersStats[id].stats}<br>
            <b>Fun Fact:</b> ${marinersStats[id].funFact}<br>
            <img src="${marinersStats[id].img}" alt="Mariners ${marinersStats[id].year}">
        `;
        container.appendChild(infoBox);
    }
}

//When reset button is clicked, hide all the past results 
function ResetScreen() {
    let raceInfoDiv = document.getElementById("race-info");
    let raceWinnerCard = document.getElementById("race-winner-info"); 
    raceWinnerCard.style.display = "none"; 
    raceInfoDiv.style.display = "none";

    raceInfoDiv.innerHTML = "";
}

let salmonData = {
  "King Salmon": { name: "King Salmon", img: "salmon_images/king_salmon.jpg" },
  "Sockeye Salmon": { name: "Sockeye Salmon", img: "salmon_images/sockeye_salmon.jpg" },
  "Silver Salmon": { name: "Silver Salmon", img: "salmon_images/silver_salmon.jpg" },
  "Humpy Salmon": { name: "Humpy Salmon", img: "salmon_images/humpy_salmon.jpg" }
};

function startRace() {
    console.log("starting the race")
    let selected = document.querySelectorAll('input[name="racer"]:checked');

    if (selected.length < 2) {
        alert("Need to select at least 2 racers."); 
        return; 
    }

    let racers = [];

    let raceInfoDiv = document.getElementById("race-info");
    raceInfoDiv.style.display = "flex"
    raceInfoDiv.innerHTML = ""; 

    for (let i = 0; i < selected.length; i++) {
        let salmonName = selected[i].value;
        racers.push(salmonName);

        // Display the name of each salmon selected 
        let p = document.createElement("p");
        p.textContent = `Racer ${i + 1}: ${salmonData[salmonName].name}`;
        raceInfoDiv.appendChild(p);
    }

    let winner = racers[Math.floor(Math.random() * racers.length)];

    // show winner on the html page 
    showWinner(winner);
}

function showWinner(winner) {
  let winnerCard = document.getElementById("race-winner-info");
  let winnerImg = document.getElementById("race-winner-image");
  let winnerText = document.getElementById("race-winner-text");

  winnerImg.src = salmonData[winner].img;
  winnerImg.alt = salmonData[winner].name;
  winnerText.textContent = `The winner is ${salmonData[winner].name}!`;

  winnerCard.style.display = "flex";
}

// attach button listener
document.getElementById("start-race").addEventListener("click", startRace);

let form = document.querySelector("#predict-2025-stats");


document.querySelector("#predict-2025-stats").addEventListener("submit", submittedFormPredictions);
function submittedFormPredictions(event){
    event.preventDefault(); 

    let winOrLoss = document.querySelector('input[name="win-or-loss"]:checked');
    let numWins = document.querySelector('#estimate-wins').value;
    marinersStats["2025"].statsPredicted = numWins;
    marinersStats["2025"].moreWins = winOrLoss.value

    if (!winOrLoss) {
        alert("Please select Wins or Losses.");
        return;
    }

    if (isNaN(numWins) || numWins < 0 || numWins > 100) {
        alert("Please enter a valid number of wins (0-100).");
        return;
    }

    let actualPercent = parseInt(marinersStats["2025"].stats);
    numWins = parseInt(numWins);  

    let resultMessage = "";

    if (numWins < actualPercent) {
        resultMessage = "too low";
    } else if (numWins > actualPercent) {
        resultMessage = "too high";
    } else {
        resultMessage = "perfect!";
    }

    let winMessage = "" 
    if (winOrLoss.value === "Win") {
        winMessage = "Correct"
    }
    else {
        winMessage = "Incorrect"
    }

    let container = document.getElementById("prediction-results");
    container.innerHTML = ""; 
    let infoBox = document.createElement("div");
    infoBox.classList.add("info-box");

    infoBox.innerHTML = `
        <b>${winMessage}:</b> The Mariners won MORE than they loss!<br>
        <b>${marinersStats["2025"].year} Prediction:</b> ${marinersStats["2025"].statsPredicted}%<br>
        <b>${marinersStats["2025"].year} Actual:</b> ${marinersStats["2025"].stats}%<br>
        <b>Your prediction was ${resultMessage}</b>
    `;
    container.appendChild(infoBox);
}