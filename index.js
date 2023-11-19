const colors = ["#e60000",
                "#ff6600",
                "#ffff00",
                "#33cc33",
                "#3399ff",
                "#7F00FF",
                "#4B0082",
                "#999999",
                "#77773c",
                "#99ccff"];
const color_id = ["color1","color2","color3","color4","color5","color6","color7","color8","color9","color10"];
var active_color_id = "color6"

function change(x){
    document.body.style.backgroundColor = colors[x];
    document.getElementById(active_color_id).classList.remove("active_color");        
    document.getElementById(color_id[x]).classList.add("active_color");        
    active_color_id = color_id[x];
}
change(6);

for(let i=0 ;i<10 ;i++){
    document.getElementById(color_id[i]).style.backgroundColor = colors[i];
    document.getElementById(color_id[i]).addEventListener("click",()=>{change(i)});
};

// #################################################################

function AddMapByCity(){
    let city = document.getElementById("searchByCityText").value
	console.log(city); 
    let source = "https://www.google.com/maps/embed/v1/search?key=AIzaSyDagJ2YTdWvb0FpGtJ7pbuREmFNs4B2vNk&zoom=15&q=electric+vehicle+charging+station+near+"+city.replaceAll(" ","+");
    console.log(source)
    let element = '<iframe style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="'+source+'"></iframe>'
    console.log(element)
    document.getElementById("gmaps").innerHTML = element;    
};

function getCoordintes() { 
	var options = { 
		enableHighAccuracy: true, 
	}; 
	function success(pos) { 
		var crd = pos.coords; 
		var lat = crd.latitude.toString(); 
		var lng = crd.longitude.toString(); 
		var coordinates = [lat, lng]; 
		console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
		getCity(coordinates); 
		return; 
	} 
	function error(err) { 
		console.warn(`ERROR(${err.code}): ${err.message}`); 
	} 
	navigator.geolocation.getCurrentPosition(success, error, options); 
} 

function getCity(coordinates) { 
	var xhr = new XMLHttpRequest(); 
	var lat = coordinates[0]; 
	var lng = coordinates[1]; 
	xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.4a91fcd56e451fedb7d2871f426d3a03&lat=" + 
	lat + "&lon=" + lng + "&format=json", true); 
	xhr.send(); 
	xhr.onreadystatechange = processRequest; 
	xhr.addEventListener("readystatechange", processRequest, false); 
	function processRequest(e) { 
		if (xhr.readyState == 4 && xhr.status == 200) { 
			var response = JSON.parse(xhr.responseText); 
            let city = response.address.city;
			console.log(city); 
            let source = "https://www.google.com/maps/embed/v1/search?key=AIzaSyDagJ2YTdWvb0FpGtJ7pbuREmFNs4B2vNk&&zoom=15&q=electric+vehicle+charging+station+near+"+city.replaceAll(" ","+");
            console.log(source)
            let element = '<iframe style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="'+source+'"></iframe>'
            console.log(element)
            document.getElementById("gmaps").innerHTML = element;        
            return; 
		} 
	} 
}



document.getElementById("locationTag").addEventListener("click",getCoordintes);
document.getElementById("searchByCityButton").addEventListener("click",AddMapByCity);









// #################################################################
