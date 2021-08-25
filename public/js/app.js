const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const output = document.getElementById("output-here");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	output.textContent = "Loading..";
	fetch(
		`http://localhost:3000/weather?address=${encodeURIComponent(
			search.value,
		)}`,
	).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				return (output.textContent = data.error);
			}
			console.log(data);
			output.textContent = `Weather in ${data.name} - ${data.forecastData}`;
		});
	});
});
