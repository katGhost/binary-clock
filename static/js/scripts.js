// fetch the data
fetch('/time')
  .then(response => response.json())
  .then(data => {
    console.log(`${data.hours} ${data.minutes} ${data.seconds}`);
  });

fetch('/binary_time')
  .then(response => response.json())
  .then(data => {
    let hours = data.hours;
    let minutes = data.minutes;
    let seconds = data.seconds;

    console.log(hours, minutes, seconds)
  });

