const request = require("request");

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address,
	)}.json?access_token=pk.eyJ1IjoicmMxMjM0IiwiYSI6ImNrc2Yxb2l0ajE2aWwydW56eHZrNTJ6cTQifQ.soeypIwzpbznWA2D5m_7YA&limit=1`;

	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback("No connection to internet", undefined);
		} else if (body.features.length === 0) {
			callback("Location not found", undefined);
		} else {
			callback(undefined, {
				lat: body.features[0].center[1],
				long: body.features[0].center[0],
				name: body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;
