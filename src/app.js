const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("../utils/forecast");
const geoCode = require("../utils/geocode");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Ritvik Chotani",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Ritvik Chotani",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "This is some helpful text.",
		title: "Help",
		name: "Ritvik Chotani",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "We need an address, Sir!",
		});
	} else {
		geoCode(req.query.address, (error, { lat, long, name } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(lat, long, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({ name: name, forecastData: forecastData });
			});
		});
	}
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		error: "This help article does not exists",
		name: "Ritvik Chotani",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		error: "Page not found",
		name: "Ritvik Chotani",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
