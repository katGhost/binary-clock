//import axios  from 'axios';
// Grab the DOM data
const hourDigits = document.querySelectorAll(".group.hours .digit");
const minuteDigits = document.querySelectorAll(".group.minutes .digit");
const secondDigits = document.querySelectorAll(".group.seconds .digit");

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
}

function fetchBinaryTime() {
  fetch('/binary_time')
    .then(response => response.json())
    .then( data => {
      updateClock(data);
    })
    .catch(error => {
      console.log("Error fetching data: ", error);
    });
}

setInterval(fetchBinaryTime, 1000);
fetchBinaryTime();

// fetch the data
/*fetch('/time')
  .then(response => response.json())
  .then(data => {
    console.log(`${data.hours} ${data.minutes} ${data.seconds}`);
});*/



