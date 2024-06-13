const fs = require('fs');
const path = require('path');

// Function to generate a random number between 0 and 9
function getRandomCouponNum() {
  return Math.floor(Math.random() * 10);
}

// Function to generate the fetchResults data
function generateFetchResultsData() {
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

// Generate data and write to fetchResults.json
const jsonData = generateFetchResultsData();
const filePath = path.join(process.cwd(), '/results/fetchResults.json');

fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
console.log('fetchResults.json generated successfully.');
