//Call these functions when the page content is loaded 
document.addEventListener("DOMContentLoaded", () => {
    fetchUpcomingLaunch();
    fetchPastLaunches();
    getNumberPeopleinSpace();
});

// Get upcoming launch, call displayLaunch function with retrieved data 
async function fetchUpcomingLaunch() {
    const res = await fetch("https://api.spacexdata.com/v5/launches/next");
    const launch = await res.json();
    displayLaunch(launch, "upcomingLaunchContainer");
}

// API call to see how many people are currently in space, display in footer
async function getNumberPeopleinSpace() {
    const res = await fetch("http://api.open-notify.org/astros.json");
    const people = await res.json();
    const footerContainer = document.querySelector("footer");
    footerContainer.innerText = ""
    const numPeople = document.createElement("h1");
    numPeople.textContent = `People in Space: ${people["number"]}`;

    footerContainer.appendChild(numPeople);
}

// Get last 5 laucnhes, add buttons for each 
async function fetchPastLaunches() {
    const res = await fetch("https://api.spacexdata.com/v5/launches/past");
    const launches = await res.json();
    const lastFive = launches.slice(-5).reverse();

    const container = document.getElementById("launchButtonsContainer");
    container.innerHTML = "";

    lastFive.forEach(launch => {
        const btn = document.createElement("button");
        btn.textContent = launch.name;
        btn.addEventListener("click", () => showLaunchDetails(launch.id));
        container.appendChild(btn);
    });
}

// 
async function showLaunchDetails(launchId) {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${launchId}`);
    const launch = await res.json();
    displayLaunch(launch, "launchDetailsContainer");
    console.error("Error fetching launch details:", err);
    document.getElementById("launchDetailsContainer").textContent = "Could not load launch details.";
}

// Get information to display for past 5 launches
async function displayLaunch(launch, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const img = document.createElement("img");
    img.src = launch.links.patch.small || "images/USSF-44.png";
    img.alt = launch.name;

    const title = document.createElement("h2");
    title.textContent = launch.name;

    const date = new Date(launch.date_utc);
    const dateElem = document.createElement("p");
    dateElem.textContent = `Launch Date: ${date.toLocaleString()}`;

    let rocketName = "Unknown Rocket";
    const rocketRes = await fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`);
    if (rocketRes.ok) {
        const rocketData = await rocketRes.json();
        rocketName = rocketData.name;
    } else {
        console.warn(`Rocket not found: ${launch.rocket}`);
    }

    const rocketElem = document.createElement("p");
    rocketElem.textContent = `Rocket: ${rocketName}`;

    // Launchpad
    let launchpadName = "Unknown Launch Site";
    const padRes = await fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`);
    if (padRes.ok) {
        const padData = await padRes.json();
        launchpadName = padData.name;
    }
    const launchpadElem = document.createElement("p");
    launchpadElem.textContent = `Launch Site: ${launchpadName}`;

    // Webcast
    const webcast = document.createElement("a");
    webcast.href = launch.links.webcast || "#";
    webcast.target = "_blank";
    webcast.textContent = launch.links.webcast ? "Watch Live Launch" : "No webcast link";

    container.appendChild(img);
    container.appendChild(title);
    container.appendChild(dateElem);
    container.appendChild(rocketElem);
    container.appendChild(launchpadElem);
    container.appendChild(webcast);
}
