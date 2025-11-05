import {GoogleGenAI} from "@google/genai"

//DO NOT put in the public folder, then everyone can see it 
const ai = new GoogleGenAI({
    apiKey: "AIzaSyCXuRDPhZhJbKkkYRVVVYTio1irXyz4wyU"
})

async function generateText(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt
    }); 

    return response.text
}

let prompt = "Give me a list of 10 uninteresting things" 
let llmText = await generateText(prompt); 
console.log(llmText)