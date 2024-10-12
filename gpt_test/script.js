// script.js
import OpenAI from "openai";
import fs from "fs";

// Load the API key from secrets.json
const apiKey = JSON.parse(fs.readFileSync('secrets.json')).CHATGPTapikey;
const openai = new OpenAI({ apiKey });

// Form submission event handler
document.getElementById("uniForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get user inputs
    const region = document.getElementById("region").value;
    const gpa = document.getElementById("gpa").value;
    const specialty = document.getElementById("specialty").value;

    // Prepare the prompt for OpenAI
    const prompt = `Based on the region: ${region}, GPA: ${gpa}, and specialty in ${specialty}, recommend a suitable university and explain why it would be a good fit.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }]
        });

        // Display the recommendation
        const recommendationDiv = document.getElementById("recommendation");
        recommendationDiv.innerHTML = `<strong>Recommendation:</strong> ${response.choices[0].message.content}`;
        recommendationDiv.classList.remove("hidden");
    } catch (error) {
        console.error("Error fetching recommendation:", error);
        alert("An error occurred while fetching the recommendation.");
    }
});
