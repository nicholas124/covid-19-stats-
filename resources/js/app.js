/* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */

//select all the elements
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");


//App variables
let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	dates = [];

//Get users country code
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach(country => {
	if (country.code == country_code) {
		user_country = country.name;
	}
});

console.log(country_code, user_country);



/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */

function fetchData(user_country) {
	fetch(`https://covid-19-data.p.rapidapi.com/country?format=json&name=${user_country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
			"x-rapidapi-key": "d17f89e0a3mshf01325bcaa9ec74p1eabafjsn164e4d0dd5d2"
		}
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			dates = Object.keys(data);

			dates.forEach(date => {
				let DATA = data[date];

				app_data.push(DATA);
				cases_list.push(DATA.confirmed);
				recovered_list.push(DATA.recovered);
				deaths_list.push(DATA.deaths);
				console.log(DATA);
			})

		})
		.then(() => {
			updateUI();
		})
		.catch(error => {
			alert(error);
		})
}

fetchData(user_country);

//update UI Function
function updateUI() {
	updateStats();
	axesLinearChart();
}
let last_entry;
function updateStats() {
	last_entry = app_data[app_data.length - 1];
	let before_last_entry = app_data[app_data.length - 2];
	
	country_name_element.innerHTML = last_entry.country;
	total_cases_element.innerHTML = last_entry.confirmed || 0;

	recovered_element.innerHTML = last_entry.recovered || 0;
	deaths_element.innerHTML = last_entry.deaths || 0;

	console.log(app_data);
}

//Update Chat
let my_chart;
function axesLinearChart() {
	// And for a doughnut chart
	data = {
		datasets: [{
			data: [last_entry.confirmed, last_entry.recovered, last_entry.deaths],
			backgroundColor: [
				'rgba(200, 99, 132, 0.5)',
				'rgba(0, 255, 0, 0.5)',
				'rgba(255, 0, 0, 0.5)'
			  ]
		}],
	
		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			'Confirmed',
			'Recovered',
			'Deaths'
		]
	};
	
	my_chart = new Chart(ctx, {
    type: 'doughnut',
	data: data,
	
});

}