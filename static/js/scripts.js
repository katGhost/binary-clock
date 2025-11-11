// Grab the DOM data
const hourDigits = document.querySelectorAll(".group.hours .digit");
const minuteDigits = document.querySelectorAll(".group.minutes .digit");
const secondDigits = document.querySelectorAll(".group.seconds .digit");

// let users decide on client-side time format preference (12h/24h)
let use12HourFormat = false;  // 24h by default

//console.log(hourDigits);
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
  updateGroup(hourDigits, data.hours);
  updateGroup(minuteDigits, data.minutes)
  updateGroup(secondDigits, data.seconds);

  // change to 12h format
  if (data.hours > 12)
  {
    data.hours -= 12;
    use12HourFormat = true;
  }
  
}

// Function to fetch api data asynchronously
const fetchBinaryTime = async () => {
  try {
    // fecth data
    const response = await axios.get("/api/binary_time");
    //console.log(response.data);
    // map the data
    const data = response.data;
    updateClock(data);
  }
  catch (error) {
    console.log("Error: ", error);
  }
    
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



