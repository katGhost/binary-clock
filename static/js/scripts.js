// fetch the data
fetch('/time')
  .then(response => response.json())
  .then(data => {
    console.log(`HH: ${data.hours}, MM: ${data.minutes}, SS: ${data.seconds}`);
  })