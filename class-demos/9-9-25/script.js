
let demoBoxes = document.getElementsByClassName("demo-box"); 

console.log(demoBoxes.length); 

let clickCount = 0; 

function buttonSubClicked(){
    clickCount--
    let topBox = document.getElementById("top-box")
    if (clickCount < 0){
        topBox.style.backgroundColor = "red";
    }
    else {
        topBox.style.backgroundColor = "yellow";
    }
    topBox.innerText = clickCount; 
}

function buttonAddClicked(){
    clickCount++
    let topBox = document.getElementById("top-box")
    if (clickCount > 0){
        topBox.style.backgroundColor = "green";
    }
    else {
        topBox.style.backgroundColor = "yellow";

    }
    topBox.innerText = clickCount; 
}