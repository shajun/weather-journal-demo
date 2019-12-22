/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=1ff87d35f10101299bc6fcf5d2318b15';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Click Event Listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  // Zip Value
  const newZip = document.getElementById('zip').value;
  // User Response Value - feelings
  const feelings = document.getElementById('feelings').value;

  getWeatherData(baseURL, newZip, apiKey).then(function(apiData) {
    // Add data
    console.log('Catch you', apiData);
    postData('/addData', {
      temp: apiData['main']['temp'],
      date: newDate,
      feelings: feelings
    });

    // updateUI();
  });
}

// TODO-Async GET
const getWeatherData = async (baseURL, zip, key) => {
  const request = await fetch(baseURL + zip + key);
  try {
    // Transform into JSON
    const apiData = await request.json();
    console.log('getWeatherData', apiData);
    return apiData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

/* POST EXAMPLE */
const postData = async (url = '', data = {}) => {
  // console.log(data)
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
    console.log('newData', newData);
    return newData;
  } catch (error) {
    console.log('error1', error);
  }
};
