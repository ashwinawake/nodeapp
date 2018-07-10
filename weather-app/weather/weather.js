const request = require('request');

let getWeather = (lat, lng, callback) => {
request({
  url:`https://api.darksky.net/forecast/854bb16bb7a0068cb622afd57fed69c6/${lat},${lng}`,
  json: true
}, (error, response, body) => {
  if(!error && response.statusCode === 200) {
  callback(undefined,{
    temperature: body.currently.temperature,
    actualTemperature: body.currently.apparentTemperature
  });
} else {
  callback(`Unable to connect to server.`);
}
});
}

module.exports = {
  getWeather
};
