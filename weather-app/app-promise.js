
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBlXfUQux9fxoE6tCjRjhzQgAlzOWSvZpc`

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find that address.');
  }
  console.log(JSON.stringify(response.data));
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/854bb16bb7a0068cb622afd57fed69c6/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((body) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`The temperature is ${temperature} but it feels like ${apparentTemperature}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
  console.log('Unable to connect to API servers.');
} else {
  console.log(e.message);
}
});
