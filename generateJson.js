// generateJson.js
import fs from 'fs/promises';
import path from 'path';

// Function to generate a random number between 0 and 9
function getRandomCouponNum() {
    return Math.floor(Math.random() * 10);
}

// Function to generate the fetchResults data
export function generateFetchResultsData(username) {
    const fetchResults = [];
    const minutesInDay = 24 * 60; // Total minutes in a day

    for (let minute = 0; minute < minutesInDay; minute++) {
        const isAM = minute < 12 * 60; // Assuming AM is from midnight to 11:59 AM
        const period = isAM ? 'AM' : 'PM';

        let hours = Math.floor(minute / 60);
        if (hours > 12) {
            hours -= 12; // Convert to 12-hour format (except for 12:00 PM)
        } else if (hours === 0) {
            hours = 12; // Set 0 to 12 for 12:00 AM
        }

        const minutes = minute % 60;
        const drawTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;

        const entry = {
            couponNum: getRandomCouponNum(),
            drawTime: drawTime
        };

        fetchResults.push(entry);
    }

    return fetchResults;
}

// Function to generate and save the JSON file
export async function generateAndSaveJson(username) {
    const jsonFilename = `fetchResults_${username}.json`;
    const filePath = path.join(process.cwd(), 'results', jsonFilename);

    // Ensure the parent directory (/results/) exists
    const directoryPath = path.join(process.cwd(), 'results');
    await fs.mkdir(directoryPath, { recursive: true }); // Create the directory if it doesn't exist

    // Generate and save the JSON file
    const jsonData = generateFetchResultsData(username);
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));

    console.log(`${filePath} generated successfully for user: ${username}`);
}
