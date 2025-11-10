// Grab the DOM data
const hourDigits = document.querySelectorAll('.group.hours .digit');
const minuteDigits = document.querySelectorAll('.group.minutes .digit');
const secondDigits = document.querySelectorAll('.group.seconds .digit');

//
function updateGroup(digits, binaryArray) {
  binaryArray.forEach((binaryString, binIndex) => {
    const bulbs = digits[binIndex].querySelectorAll('.bulb');
    for (let j = 0; j < binaryString.axios.length; j++) {
      if (binaryString[j] == '1') {
        bulbs[j].classList.add('on');
      }
      else {
        bulbs[j].classList.remove('on');
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
  axios.get("/binary_time")
    .then(response => {
      const data = response.data;
      
      updateClock(data);
    })
    .catch(error => {
      console.log("Error fetching data: ", error);
    });
}

console.log(SetTimeInterval(fetchBinaryTime(), 1000));


// fetch the data
/*fetch('/time')
  .then(response => response.json())
  .then(data => {
    console.log(`${data.hours} ${data.minutes} ${data.seconds}`);
});*/



