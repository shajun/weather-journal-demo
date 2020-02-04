// OpenWeatherMap Base URL
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=1ff87d35f10101299bc6fcf5d2318b15&units=imperial';

// Click Event Listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  // Create a new date instance dynamically with JS
  let d = new Date();
  let currentDate = d.toDateString();

  // Get user zip code
  const userZip = document.getElementById('zip').value;

  // Get user response value - feelings
  const feelings = document.getElementById('feelings').value;

  // Get weather data from OpenWeatherMap API
  getWeatherData(baseURL, userZip, apiKey).then(function(apiData) {
    // console.log('Received data', apiData);

    // Add data to endpoint
    postData('/addData', {
      temp: apiData['main']['temp'],
      date: currentDate,
      feelings: feelings
    });
    // update UI
    updateUI();
  });
}

// TODO-Async GET
const getWeatherData = async (baseURL, userZip, apiKey) => {
  const request = await fetch(baseURL + userZip + apiKey);
  try {
    // transform into JSON
    const apiData = await request.json();
    console.log('getWeatherData', apiData);
    return apiData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log('allData for updata UI', allData);
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feelings;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// TODO-Async POST
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log('postData', newData);
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};
