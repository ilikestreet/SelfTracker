// initChart.js
var ctx = document.getElementById('myChart').getContext('2d');

var timeFormat = 'HH:mm';
var today = new Date();
today.setHours(0,0,0,0);
var timeline = new Date(today.toDateString());
var start = today.getTime();
today.setHours(23,59,59,999);
var endOfDay = new Date(today.toDateString());
var end = today.getTime();

var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'line',

// The data for our dataset
data: {
	// labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
			// "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],

		labels: [moment(timeline).add(0, 'h').toDate(), moment(timeline).add(1, 'h').toDate()],

	datasets: [
			{
				label: "1v1",
				backgroundColor: 'rgb(255, 99, 132)', 
				borderColor: 'rgb(255, 99, 132)',
				fill: false,
				data: data11,
			},
			{
				label: "2v2",
				backgroundColor: 'rgb(21, 9, 132)', 
				borderColor: 'rgb(21, 9, 132)',
				fill: false,
				data: data22,
			},

			{
				label: "3v3",
				backgroundColor: 'rgb(0, 200, 132)', 
				borderColor: 'rgb(0, 200, 132)',
				fill: false,
				data: data33,
			},
			{
				label: "solo 3v3",
				backgroundColor: 'rgb(21, 9, 255)', 
				borderColor: 'rgb(21, 9, 255)',
				fill: false,
				data: data33s,
			},
		]
},

	// Configuration options go here
	options: {
		title: {
	        display: true,
	        text: 'My Rocket League Tracker'
	    },
	    scales: {
	    	yAxes: [{
	    		scaleLabel: {			
					display: true,
					labelString: 'Wins'
				},

            	ticks: {
	                stepSize: 1
			    }
			}],
        	xAxes: [{
        		type: "time",
        		time: {
					format: timeFormat,
        			tooltipFormat: 'HH:mm'
        		},
				scaleLabel: {			
					display: true,
					labelString: 'Time'
				},
				min: start,
				min: end,
        	}]
        }
	}
});