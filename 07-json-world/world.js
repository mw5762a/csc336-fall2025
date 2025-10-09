import fs from 'fs' 

const fileContents = fs.readFileSync("world.json", 'utf-8')
const jsonData = JSON.parse(fileContents)

for (const region of jsonData.regions){
    console.log(`Region Name: ${region.name}\n`)
    
    for (const town of region.towns){
        console.log(`Town Name: ${town.name}`)
        console.log(`Town Population: ${town.population}`)

        for (const person of town.notable_people){
            console.log(`Resident,${person.name}, lives in ${town.name} and works as a ${person.role}.`)
        }
    }
    console.log("___________________")
}
    

