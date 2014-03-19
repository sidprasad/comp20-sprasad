// Written by Siddhartha Prasad
Blue = new Object();
Red = new Object();
Orange = new Object();
//Order: Name, Latitude, Longitude
Blue[6] =["Airport",42.374262,-71.030395];
Blue[8] =["Aquarium",42.359784,-71.051652];
Blue[2] =["Beachmont",42.39754234,-70.99231944];
Blue[11] =["Bowdoin",42.361365,-71.062037];
Blue[10] =["Government Center",42.359705,-71.059215];
Blue[7] =["Maverick",42.36911856,-71.03952958];
Blue[4] =["Orient Heights",42.386867,-71.004736];
Blue[1] =["Revere Beach",42.40784254,-70.99253321];
Blue[9] =["State Street",42.358978,-71.057598];
Blue[3] =["Suffolk Downs",42.39050067,-70.99712259];
Blue[0] =["Wonderland",42.41342,-70.991648];
Blue[5] =["Wood Island",42.3796403,-71.02286539];
Orange[11] =["Back Bay",	42.34735,-71.075727];
Orange[9] =["Chinatown",42.352547,-71.062752];
Orange[4] =["Community College",42.373622,-71.069533];
Orange[8] =["Downtown Crossing",42.355518,-71.060225];
Orange[18] =["Forest Hills",42.300523,-71.113686];
Orange[17] =["Green Street",42.310525,-71.107414];
Orange[6] =["Haymarket",42.363021,-71.05829];
Orange[15] =["Jackson Square",42.323132,-71.099592];
Orange[1] =["Malden Center",42.426632,-71.07411];
Orange[12] =["Mass Ave",42.341512,-71.083423];
Orange[5] =["North Station",42.365577,-71.06129];
Orange[0] =["Oak Grove",42.43668,-71.071097];
Orange[14] =["Roxbury Crossing",42.331397,-71.095451];
Orange[13] =["Ruggles",42.336377,-71.088961];
Orange[7] =["State Street",42.358978,-71.057598];
Orange[16] =["Stony Brook",42.317062,-71.104248];
Orange[3] =["Sullivan",42.383975,-71.076994];
Orange[10] =["Tufts Medical",42.349662,-71.063917];
Orange[2] =["Wellington", 42.40237, -71.077082];
Red[0] =["Alewife",42.395428,-71.142483];
Red[11] =["Andrew",42.330154,-71.057655];
Red[21] =["Ashmont",42.284652,-71.064489];
Red[17] =["Braintree",42.2078543,-71.0011385];
Red[10] =["Broadway",42.342622,-71.056967];
Red[4] =["Central Square",42.365486,-71.103802];
Red[6] =["Charles/MGH",42.361166,-71.070628];
Red[1] =["Davis",42.39674,-71.121815];
Red[8] =["Downtown Crossing",42.355518,-71.060225];
Red[19] =["Fields Corner",42.300093,-71.061667];
Red[3]= ["Harvard Square",42.373362,-71.118956];
Red[12] =["JFK/UMass",42.320685,-71.052391];
Red[5]= ["Kendall/MIT",42.36249079,-71.08617653];
Red[13] =["North Quincy",42.275275,-71.029583];
Red[7]=	["Park Street",42.35639457,-71.0624242];
Red[2]=	["Porter Square",42.3884,-71.119149];
Red[16] =["Quincy Adams",42.233391,-71.007153];
Red[15] =["Quincy Center",42.251809,-71.005409];
Red[18] =["Savin Hill",42.31129,-71.053331];
Red[20] =["Shawmut",42.29312583,-71.06573796];
Red[9]=	["South Station",42.352271,-71.055242];
Red[14] = ["Wollaston",42.2665139,-71.0203369];

//km to mile conversion factor
var kmtoMile = 0.621371;
var myLat = 0;
var myLng = 0;
var request;
var scheduleData;
var map;
var marker;
var infowindow;
var places;
//Distance is greater than 1.7976931348623157E+10308, which is greater than
//floating point numbers
var nearest = {"name":'NONE', "distance":1.7976931348623157E+10308};
		
function init()
{
	request = new XMLHttpRequest();
	infowindow = new google.maps.InfoWindow();
	request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	
	request.send(null);
	request.onreadystatechange = dataReady;
}

function dataReady() {
	if (request.readyState == 4 && request.status == 200) {
			scheduleData = JSON.parse(request.responseText);
			getLocation();

	}
	else if (request.readyState == 4 && request.status == 500) {
			//mapDom = document.getElementById("T_map");
			//mapDom.innerHTML = '<p>Could not load</p>';
			alert('Error fetching data! Press OK to reload');
			init();
	}
}
			
function getLocation()
{
	if (navigator.geolocation) { 
		// the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		me = new google.maps.LatLng(myLat, myLng);
		myOptions = {
				zoom: 13, // The larger the zoom number, the bigger the zoom,
				center: me,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("T_map"), myOptions);

		renderMap();
		});
	} else {
			alert("Geolocation is not supported by your web browser.");
		}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);	
		markStations();	
	// Update map and go there...
	map.panTo(me);


	// Create a marker
	marker = new google.maps.Marker({
		
		position: me,
		title: "You are here; "+ (nearest.distance * kmtoMile).toFixed(4) +" miles from "+nearset.name +" the nearest " + scheduleData.line + " line station"});
	marker.setMap(map);
	
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);	
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	
	
}

function calculateDistance(place) {

   //Credit to stackoverflow question 
   //http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript 

	var destLat = place[1]; 
	var destLong = place[2]; 


	var R = 6371; // km 
	
	var x1 = destLat - myLat;
	var dLat = toRad(x1);  
	var x2 = destLong-myLng;
	var dLon = toRad(x2);
 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(myLat)) * Math.cos(toRad(place[1])) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
	
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 

	return d;
}

function markStations (){
	var logo;
	//lineCoords holds the coordinates of the station on the line,
	//so that a polyline can be drawn.
	var lineCoords = [];
	var min_dist = nearest.distance;
	var min_name =nearest.name;
	line_colour = scheduleData.line;
	if (line_colour == 'blue') {
		logo='blue-stars.png';
		for(i in Blue) {
			lineCoords[i] = new google.maps.LatLng(Blue[i][1], Blue[i][2]);
			if(calculateDistance(Blue[i]) < min_dist) {
				min_dist = calculateDistance(Blue[i]);
				min_name = Blue[i][0];
			}
			createMarker(Blue[i],logo);
		}
		drawLine(lineCoords, '#0000FF');		
	}
		
	if (line_colour == 'orange') {
		logo='orange-stars.png';
		for(i in Orange) {
			lineCoords[i] = new google.maps.LatLng(Orange[i][1], Orange[i][2]);
			if(calculateDistance(Orange[i]) < min_dist) {
				min_dist = calculateDistance(Orange[i]);
				min_name = Orange[i][0];
			}
			createMarker(Orange[i],logo);
		}	
		drawLine(lineCoords, '#FF6600');	
	}
	
	if (line_colour == 'red') {
		logo='red-stars.png';
		for(i = 0; i <18; i++ ) {
		lineCoords[i] = new google.maps.LatLng(Red[i][1], Red[i][2]);
			if(calculateDistance(Red[i]) < min_dist) {
				
				min_name = Red[i][0];
				min_dist = calculateDistance(Red[i]);
			}
			createMarker(Red[i],logo);
		}
		drawLine(lineCoords, '#FF0000');

		lineCoords = [];
		lineCoords[0] = new google.maps.LatLng(Red[12][1], Red[12][2]);
		for(i = 18; i <= 21; i++) {
			lineCoords[i-17] = new google.maps.LatLng(Red[i][1], Red[i][2]);
			if(calculateDistance(Red[i]) < min_dist) {
				min_name = Red[i][0];
				min_dist = calculateDistance(Red[i]);
			}
			createMarker(Red[i],logo);
		}
	
		drawLine(lineCoords, '#FF0000');
	}

	nearest.name = min_name;
	nearest.distance = min_dist;

}

function drawLine(lineCoord, colour) {
//Using polyline from the google maps API to draw lines
   var MBTA_line = new google.maps.Polyline({
    path: lineCoord,
    geodesic: true,
    strokeColor: colour,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
	MBTA_line.setMap(map);

}

function toRad(num) {
	return (num*Math.PI / 180)
}
			
function createMarker(place, logo)
{
	var placeLoc = new google.maps.LatLng(place[1],place[2]);
	var marker = new google.maps.Marker({
		map: map,
		position: placeLoc,
		icon: logo
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(stationTable(place));
		infowindow.open(map, this);
	});
}

function stationTable(place) {
	//Adding name to stationInfo	
	stationInfo = place[0];
	var stationTable = document.createElement("table");
	stationInfo = stationInfo + "<table><tr><th>Line</th><th>Trip  #<th><th>Destination</th><th>Time Remaining</th></tr>";

	//Getting train wait times and destinations from scheduleData
	//For each station:
	for (i in scheduleData.schedule) {
		for (j in scheduleData.schedule[i].Predictions) {
			if (place[0] == scheduleData.schedule[i].Predictions[j].Stop) { 
               			 stationInfo = stationInfo + "<tr><td>" + scheduleData.line.toUpperCase() + '</td><td>' + scheduleData.schedule[i].TripID + "<td><td>";
                			stationInfo += scheduleData.schedule[i].Destination + "</td><td>" + 
                   			 formatTime(scheduleData.schedule[i].Predictions[j].Seconds) + "</td></tr>";
            }

		}
	}
	stationInfo = stationInfo + '</table>';

	return stationInfo;
}


function formatTime(num_seconds) {
	var num_minutes = Math.floor(num_seconds / 60);
	num_seconds = num_seconds % 60;
	if (num_seconds<10) {
		num_seconds = '0' + num_seconds;
	}
	var time_formatted = num_minutes + ':' + num_seconds;
	return time_formatted;
}



function stationMarker(place)
{
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

