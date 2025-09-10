const salmonNames = ["King Salmon", "Sockeye Salmon", "Silver Salmon"]; //Humpy not included because he always loses - it's a thing trust.
const winnerImageMap = {
    "King Salmon": "salmon_images/king_salmon.jpg",
    "Sockeye Salmon": "salmon_images/sockeye_salmon.jpg",
    "Silver Salmon": "salmon_images/silver_salmon.jpg"
};

// Dictionary counter for wins 
const winCounts = {
  "King Salmon": 0,
  "Sockeye Salmon": 0,
  "Silver Salmon": 0,
  "Humpy Salmon": 0
};

function placeBet(userChoice) {    
    const winner = salmonNames[Math.floor(Math.random() * salmonNames.length)];

    const winnerCard = document.getElementById("winner-info");
    const winnerImg = document.getElementById("winner-image");
    const winnerText = document.getElementById("winner-text");

    console.log("User choice:", userChoice); 
    console.log("Winner:", winner);          

    winCounts[winner]++;
    document.getElementById(`${winner}-wins`).textContent = `Wins: ${winCounts[winner]}`;

    // Set the image to the winner's image
    winnerImg.src = winnerImageMap[winner];

    // Show the card after a vote
    winnerCard.style.display = "flex";

    if (userChoice === winner) {
        winnerText.textContent = `You won! The winner is ${winner}.`;
        winnerCard.style.backgroundColor = "green";
        winnerText.style.color = "#f2f2f2";
    } else {
        winnerText.textContent = `Sorry, the winner is ${winner}.`;
        winnerCard.style.backgroundColor = "red";
        winnerText.style.color = "#f2f2f2";
    }
}

function showInfo(id, text) {
    // see if the text box exists, if it does make it go away 
    const existingBox = document.querySelector(".info-box");
    if (existingBox) {
        existingBox.remove();
    }

    const infoBox = document.createElement("div");
    infoBox.classList.add("info-box");
    infoBox.id = id;
    infoBox.textContent = text;
    infoBox.style.fontSize = 16;  

    // Append it to the bet section for styling 
    document.getElementById("info-box-container").appendChild(infoBox);
}