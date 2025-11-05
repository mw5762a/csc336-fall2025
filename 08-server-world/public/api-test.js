//import { parse } from "csv-parse/sync"

async function getWorldInfo(url) {
    if (url.charAt(url.length-1) === "/") {
        url = url.slice(0, url.length-1); 
    }

    let response = await fetch(`${url}/world`)
    let json = await response.json() 
    console.log(json)
}

SHEET_URL = "https://docs.google.com/spreadsheets/d/1imyRUMbPFhcxHkxsuyH94v67WQeP3D5psDp-2eNLgCQ/export?format=csv"
async function fetchAndParseSheet() {
    try {
        const res = await fetch(SHEET_URL) 
        const text = await res.text(); 
        console.log(text) 

        let lines = text.split("\n")
        let headers = lines[0].split(",")
        let studentInfo = [] 

        for (let header of headers) {
            console.log(header)
        }

        for (let i = 1; i < lines.length; i++){
            let line = lines[i].trim()
            entries = line.split(",")
            let student = {} 
            for (let j = 0; j < entries.length; j++){
                student[headers[j].trim()] = entries[j] 
            }
            studentInfo.push(student)
        }

        console.log(studentInfo)

        for (let student of studentInfo) {
            if(student["render"] !== "" && student["cors"] === "1") {
                console.log(`${student["First"]}'s World: `)
                let url = student["render"]
                let response = await getWorldInfo(url) 
                let worldJSON = response.json(); 
                console.log(worldJSON)
            }
        }
    }

    catch {
        console.log("in the catch")
    }
}

const records = parse(text, {
    columns: true, 
    skip_empty_lines: true
})


fetchAndParseSheet() 