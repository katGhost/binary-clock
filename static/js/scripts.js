import axios from 'axios';
// fetch the data
fetch('/time')
  .then(response => response.json())
  .then(data => {
    console.log(`${data.hours} ${data.minutes} ${data.seconds}`);
});

axios.get('/binary_time')
  .then(response => {
    const data = response.data;

    
  })

