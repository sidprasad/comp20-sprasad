

//Hardcode arrays here!!
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
//
//
var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var scheduleData;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
		
function init()
{
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
			mapDom = document.getElementById("T_map");
			mapDom.innerHTML = '<p>Could not load</p>';
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
				zoom: 13, // The larger the zoom number, the bigger the zoom
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
	
	// Update map and go there...
	map.panTo(me);
	// Create a marker
	// WILL HAVE TO CHANGE THIS SOON
	marker = new google.maps.Marker({
		position: me,
		title: "You are here"
	});
	marker.setMap(map);
					
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	
	markStations();		
}
function markStations (){
	console.log(scheduleData.line);	
	line_colour = scheduleData.line;
	if (line_colour == 'blue') {
		for(i in Blue) {
			createMarker(Blue[i]);
		}		
	}
		
	if (line_colour == 'orange') {
		for(i in Orange) {
			createMarker(Orange[i]);
		}		
	}
	
	if (line_colour == 'red') {
		for(i = 0; i <18; i++ ) {
			createMarker(Red[i]);
		}
		for(i = 18; i <= 21; i++) {
			createMarker(Red[i]);
		}
	}
}
			
function createMarker(place)
{
	var placeLoc = new google.maps.LatLng(place[1],place[2]);
	//Get icon here, iconSource
	var marker = new google.maps.Marker({
		map: map,
		position: placeLoc
		//icon: iconSource
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
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
