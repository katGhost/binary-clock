// Grab the DOM data
const hourDigits = document.querySelectorAll(".group.hours .digit");
const minutesDigits = document.querySelectorAll(".group.minutes .digit");
const secondsDigits = document.querySelectorAll(".group.seconds .digit");
// Get toggle btn
const toggleButton = document.getElementById("toggle-button");
const ampmDisplay = document.getElementById("ampm-wrapper");

// let users decide on client-side time format preference (12h/24h)
let is24Hour = true;  // 24h by default

// Add a listener to button
toggleButton.addEventListener("click", () => {
  //console.log("I am clicked!");
  is24Hour = !is24Hour;   // Toggle the flag first

  // update the button text
  toggleButton.textContent = is24Hour ? "Switch to 12H" : "Switch to 24H";

  // Get the text-content
  if (is24Hour)
  {
    // if time is on 24H (default) No AM/PM display
    document.getElementById("am-pm").textContent = " ";
  }
  else {
    // if time is in 12H, then display AM/PM
    const now = new Date();
    const hours = now.getHours();
    //update am-pm styles
    document.getElementById("am-pm").textContent = hours >= 12 ? "PM" : "AM";
  }
  

  fetchBinaryTime();    // Refresh time
});

//console.log(hourDigits);

// Function to fetch api data asynchronously
const fetchBinaryTime = async () => {
  try {
    // Fecth data
    const response = await axios.get("/api/binary_time");
    //console.log(response.data);

    let data = response.data;

    if (!is24Hour)
    {
      data = convertTo12HourBinary(data);
    }
    // Update the clock
    updateClock(data);

  }
  catch (error) {
    console.log("Error: ", error);
  }
    
}

// Function to turn time to 12h format (regardless of timezone)
function convertTo12HourBinary(binaryData)
{
  // Convert binary digits -> numeric hours etc.
  const hour = parseInt(binaryData.hours[0], 2) * 10 + parseInt(binaryData.hours[1], 2);
  const minutes = binaryData.minutes;
  const seconds = binaryData.seconds;

  /*
  ========== Above conversion adapted from chatGPT ============
  */

  // To 12h format
  let newHour = hour % 12;
  if (newHour === 0) {
    newHour = 12;
  }

  // Rebuilding time into binary digits
  const h1 = Math.floor(newHour / 12);
  const h2 = newHour / 10;

  const convert = (num) => num.toString(2).padStart(4, "0");

  return {
    hours: [convert(h1), convert(h2)],
    minutes,
    seconds
  };
}

//
function updateGroup(digits, binaryArray) {
  binaryArray.forEach((binaryString, binIndex) => {
    const bulbs = digits[binIndex].querySelectorAll(".bulb");
    for (let j = 0; j < binaryString.length; j++) {
      if (binaryString[j] == '1') {
        bulbs[j].classList.add("on");
      }
      else {
        bulbs[j].classList.remove("on");
      }
    }
  });
}

// Function to update light bulbs
function updateClock(data) {
  // Only reverse hours if in 12H mode
  const hourBinary = is24Hour ? data.hours : data.hours.map(b => b.split("").reverse().join(""));
  
  updateGroup(hourDigits, hourBinary);
  updateGroup(minutesDigits, data.minutes)
  updateGroup(secondsDigits, data.seconds);

}

// Helper function (if needed)
const pad = (num) => {
  return num.toString().padStart(2, '0');
}

document.addEventListener("DOMContentLoaded", () => {
  fetchBinaryTime();
  setInterval(fetchBinaryTime, 1000);
});



// fetch the data
/*fetch('/time')
  .then(response => response.json())
  .then(data => {
    console.log(`${data.hours} ${data.minutes} ${data.seconds}`);
});*/



