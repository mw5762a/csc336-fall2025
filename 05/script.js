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
}
let salmonData = {
  "King Salmon": { name: "King Salmon", img: "salmon_images/king_salmon.jpg" },
  "Sockeye Salmon": { name: "Sockeye Salmon", img: "salmon_images/sockeye_salmon.jpg" },
  "Silver Salmon": { name: "Silver Salmon", img: "salmon_images/silver_salmon.jpg" },
  "Humpy Salmon": { name: "Humpy Salmon", img: "salmon_images/humpy_salmon.jpg" }
};

// Track number of wins per salmon
let salmonWins = {
  "King Salmon": 0,
  "Sockeye Salmon": 0,
  "Silver Salmon": 0,
  "Humpy Salmon": 0
};

let ctx = document.getElementById("salmonWinsChart").getContext("2d");
let salmonChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: Object.keys(salmonWins),
    datasets: [{
      label: "Number of Wins",
      data: Object.values(salmonWins),
      backgroundColor: ["#f94144", "#c4ced4", "#43aa8b", "#1e3a8a"],
      borderColor: "#ffffff",
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Salmon Race Wins",
        color: "#ffffff",        
        font: {
          size: 60,
          family: "Graduate, sans-serif", 
          weight: "bold"
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        display: true,          
        position: "right",       
        labels: {
          color: '#fff',        
          font: {
            size: 14,              
            weight: 'bold',       
            family: 'Graduate, sans-serif'
          },
          boxWidth: 20,        
          boxHeight: 20,       
          padding: 15            
        }
      },
      tooltip: {
        enabled: true, 
        backgroundColor: '#fff',  
        titleColor: '#1e3a8a',           
        bodyColor: '#1e3a8a',        
        borderColor: '#43aa8b',      
        borderWidth: 1,         
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            let value = context.parsed;
            return `${label}: ${value} wins`;
          }
        }
      }
    }
  }
});

// Show updated chart on page canvas based on race winner 
function updateChart(winner) {
  salmonWins[winner] += 1; 
  salmonChart.data.datasets[0].data = Object.values(salmonWins);
  salmonChart.update();

  //Show the chart after the first selection has been made 
  document.querySelector('.chart-background').style.display = 'flex';
  document.querySelector('.chart-container').style.display = 'flex';
  document.querySelector('#salmonWinsChart').style.display = 'flex';
}

//When reset button is clicked, hide all the past results 
function ResetScreen() {
    let raceInfoDiv = document.getElementById("race-info");
    let raceWinnerCard = document.getElementById("race-winner-info"); 
    raceWinnerCard.style.display = "none"; 
    raceInfoDiv.style.display = "none";

    raceInfoDiv.innerHTML = "";
}

function startRace() {
    console.log("starting the race")
    let selected = document.querySelectorAll('input[name="racer"]:checked');

    if (selected.length < 2) {
        alertify.alert("Select at least two salmon to race.").set('title', '');
        return; 
    }

    let racers = [];

    for (let i = 0; i < selected.length; i++) {
        let salmonName = selected[i].value;
        racers.push(salmonName);
    }

    let winner = racers[Math.floor(Math.random() * racers.length)];

    //Show winner on the html page 
    showWinner(winner);
    updateChart(winner); 
}

//Show winner from the race on a card with image 
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