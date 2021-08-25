const request = require("request");

const forecast = (lat, long, callback) => {
	const weatherURL = `http://api.weatherstack.com/current?access_key=787c0db44b53bc1830f84086234dc19d&query=${encodeURIComponent(
		lat,
	)},${encodeURIComponent(long)}&units=m`;

	request({ url: weatherURL, json: true }, (err, { body }) => {
		if (err) {
			callback("No connection to internet", undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]}, It is ${body.current.temperature}. It feels like ${body.current.feelslike}`,
			);
		}
	});
};

module.exports = forecast;
