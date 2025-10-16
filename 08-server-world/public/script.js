
async function loadWorld() {
    const res = await fetch("/world");
    const data = await res.json();

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