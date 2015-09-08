
$("#filterBtn").click(function(){
	criteria=parseInt($("#filterInput").val());

	//change to set filter
	airspace_b.clearLayers();
	airspace_b.addData(airspace_data_b);

		airspace_c.clearLayers();
	airspace_c.addData(airspace_data_c);

		airspace_d.clearLayers();
	airspace_d.addData(airspace_data_d);

		airspace_e.clearLayers();
	airspace_e.addData(airspace_data_e);

		airspace_f.clearLayers();
	airspace_f.addData(airspace_data_f);


});

function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}

function getDistanceLatLng(lat1,lng1,lat2,lng2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lng2 - lng1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}

var rad = function(x) {
  return x * Math.PI / 180;
};

function handleJson_b(data) {
    // L.geoJson(data, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng, geojsonMarkerOptions);
    //         //return L.marker(latlng);
    //     }
    // }).addTo(map);
	airspace_data_b=data;
	airspace_b.addData(airspace_data_b);
	//console.log("handleJson:"+data);
}

function handleJson_c(data) {
    // L.geoJson(data, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng, geojsonMarkerOptions);
    //         //return L.marker(latlng);
    //     }
    // }).addTo(map);
	airspace_data_c=data;
	airspace_c.addData(airspace_data_c);
	//console.log("handleJson:"+data);
}

function handleJson_d(data) {
    // L.geoJson(data, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng, geojsonMarkerOptions);
    //         //return L.marker(latlng);
    //     }
    // }).addTo(map);
	airspace_data_d=data;
	airspace_d.addData(airspace_data_d);
	//console.log("handleJson:"+data);
}

function handleJson_e(data) {
    // L.geoJson(data, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng, geojsonMarkerOptions);
    //         //return L.marker(latlng);
    //     }
    // }).addTo(map);
	airspace_data_e=data;
	airspace_e.addData(airspace_data_e);
	//console.log("handleJson:"+data);
}

function handleJson_f(data) {
    // L.geoJson(data, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng, geojsonMarkerOptions);
    //         //return L.marker(latlng);
    //     }
    // }).addTo(map);
	airspace_data_f=data;
	airspace_f.addData(airspace_data_f);
	//console.log("handleJson:"+data);
}

/*
desc: 	initialize map div and setup layers
parameter:
		{mapdiv}: map div name
return value:
		{map}: the map global variable
*/
function initmap(mapdiv){
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib});

	var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});



    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
	    Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}),
	    googleSatelite=new L.Google(),
	    googleHybrid=new L.Google('TERRAIN');

	var map = L.map(mapdiv, {
		doubleClickZoom:false,
		center: [33, -117],
		zoom: 10,
		layers: [osm]
	});

	var baseLayers = {
		//"Grayscale": grayscale,
		"OpenStreetMap":osm
		,"Satelite":googleSatelite
		,"Streets": Esri_WorldStreetMap
		,"Hybrid": googleHybrid
		
	};

	var overlays = {
		
		
	};


	L.control.layers(baseLayers, overlays).addTo(map);


	return map;
}

/*
desc: 	point spatia query
		send post request to server to query airport database and return airport point records
parameters:
		{latLng}: L.latlng
return value:
		none
*/
function query(latLng, map){
	var lat=latLng.lat;
	var lng=latLng.lng;


	for (var i = 0; i<result_markers.length; i++) {
      result_markers[i].setMap(null);
    }

	$.post("http://97.68.192.217:9000/test/wfs.php",{"lng":lng,"lat":lat},function(data){
		console.log(data);
		//var ul=$("#resultList");
		//ul.empty();
		$.each(data,function(index,value){
			console.log(value);
			var marker=L.marker([value[2],value[3]],{
				icon:L.icon({
				    iconUrl: 'resources/plane.png',
				    iconSize: [25, 25],
				    iconAnchor: [12, 12],
				    popupAnchor: [0, -10]
				    //shadowUrl: 'my-icon-shadow.png',
				    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
				    //shadowSize: [68, 95],
				    //shadowAnchor: [22, 94]
				})
			}).bindPopup(value[0]+","+value[1]+", type:"+value[4]);
			marker.addTo(map);
			// var temp=new google.maps.Marker({
			// 	position:new google.maps.LatLng(value[2],value[3]),
			// 	map:map,
			// 	icon:{
			// 		url:"resources/plane.png",
			// 		//url:customIcons.restaurant.icon,
			// 		size: new google.maps.Size(144, 99),
			// 		origin: new google.maps.Point(0, 0),
//    					anchor: new google.maps.Point(12, 12),
//     				scaledSize: new google.maps.Size(25, 25)
			// 	},
			// 	title:value[0]
			// });




			result_markers.push(marker);
			//$('<li/>').text(value[0]+","+value[1]+", type:"+value[4]).appendTo(ul);
		});
	});
}

function queryProperty(){


	for (var i = 0; i<result_markers.length; i++) {
      map.removeLayer(result_markers[i]);
    }

	$.post("http://localhost/property_search/map/query.php",{"website":website,"city":city},function(data){
		console.log(data);
		//var ul=$("#resultList");
		//ul.empty();
		$.each(data,function(index,value){
			console.log(value);
			if(value[1]!=null&&value[2]!=null){
				var marker=L.marker(
					[value[1],value[2]],
					{}
					).bindPopup(value[0]+","+value[1]+","+value[2]+"<br/>"+"Address:"+value[3]);
				marker.addTo(map);
				result_markers.push(marker);
			}
			
		});
	});
}


/*
desc: 	user add point public function
parameters:
		{lat}: latitude
		{lng}: longitude
		{map}: map variable
return value:
		{L.Marker}:marker variable
*/
function add_Point_Green(lat, lng, map){
	//validate latlng
	if(validateLat_Lng(lat,lng)){
		var marker=L.marker([lat,lng],{
			icon: new L.icon({
			    iconUrl: 'images/marker-hole-green.png',
			    //iconRetinaUrl: 'my-icon@2x.png',
			    iconSize: [32, 50],
			    iconAnchor: [16, 50],
			    popupAnchor: [0, -40],
			    shadowUrl: 'images/marker-shadow.png',
			    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
			    shadowSize: [50, 50],
			    shadowAnchor: [16, 50]
			})
		})
			.bindPopup(lat+", "+lng);
		marker.addTo(map);

		return marker;
	}
	else{
		return null;
	}
}

function add_Point_Orange(lat, lng, map){
	//validate latlng
	if(validateLat_Lng(lat,lng)){
		var marker=L.marker([lat,lng],{
			icon: new L.icon({
			    iconUrl: 'images/marker-hole-orange.png',
			    //iconRetinaUrl: 'my-icon@2x.png',
			    iconSize: [32, 50],
			    iconAnchor: [16, 50],
			    popupAnchor: [0, -40],
			    shadowUrl: 'images/marker-shadow.png',
			    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
			    shadowSize: [50, 50],
			    shadowAnchor: [16, 50]
			})
		})
			.bindPopup(lat+", "+lng);
		marker.addTo(map);

		return marker;
	}
	else{
		return null;
	}
}

function add_Point_Red(lat, lng, map){
	//validate latlng
	if(validateLat_Lng(lat,lng)){
		var marker=L.marker([lat,lng],{
			icon: new L.icon({
			    iconUrl: 'images/marker-hole-red.png',
			    //iconRetinaUrl: 'my-icon@2x.png',
			    iconSize: [32, 50],
			    iconAnchor: [16, 50],
			    popupAnchor: [0, -40],
			    shadowUrl: 'images/marker-shadow.png',
			    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
			    shadowSize: [50, 50],
			    shadowAnchor: [16, 50]
			})
		})
			.bindPopup(lat+", "+lng);
		marker.addTo(map);

		return marker;
	}
	else{
		return null;
	}
}

function add_Circle(latlng, radius,map){
	//validate latlng
	if(validateLatLng(latlng)){
		circlePrimary=L.circle(latlng,radius)
			.bindPopup(latlng.lat+", "+latlng.lng+": "+radius);
		circlePrimary.addTo(map);

		query_Circle(latlng.lat, latlng.lng,radius);

		query_airspace_Circle(latlng.lat, latlng.lng,radius);

		return circle;
	}
	else{
		return null;
	}


}

function query_Circle(lat,lng, radius){
	var radius_proj=radius/METER_PER_UNIT.DEGREE;

	$.post("http://97.68.192.217:9000/test/airmarket/query.php",{"lng":lng,"lat":lat,"radius":radius_proj},function(data){
		console.log(data);
		//var ul=$("#resultList");
		//ul.empty();
		$.each(data,function(index,value){
			console.log(value);
			var marker=L.marker([value[2],value[3]],{
				icon:L.icon({
				    iconUrl: 'resources/plane.png',
				    iconSize: [25, 25],
				    iconAnchor: [12, 12],
				    popupAnchor: [0, -10]
				    //shadowUrl: 'my-icon-shadow.png',
				    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
				    //shadowSize: [68, 95],
				    //shadowAnchor: [22, 94]
				})
			}).bindPopup(value[0]+","+value[1]+", type:"+value[4]);
			marker.addTo(map);
			// var temp=new google.maps.Marker({
			// 	position:new google.maps.LatLng(value[2],value[3]),
			// 	map:map,
			// 	icon:{
			// 		url:"resources/plane.png",
			// 		//url:customIcons.restaurant.icon,
			// 		size: new google.maps.Size(144, 99),
			// 		origin: new google.maps.Point(0, 0),
//    					anchor: new google.maps.Point(12, 12),
//     				scaledSize: new google.maps.Size(25, 25)
			// 	},
			// 	title:value[0]
			// });




			result_markers.push(marker);
			//$('<li/>').text(value[0]+","+value[1]+", type:"+value[4]).appendTo(ul);
		});
	});
}

function query_airspace_Circle(lat,lng, radius){
	var radius_proj=radius/METER_PER_UNIT.DEGREE;

	$.post("http://97.68.192.217:9000/test/airmarket/query_airspace.php",{"lng":lng,"lat":lat,"radius":radius_proj},function(data){
		console.log(data);

		$("#result_info").text("Airspace around "+radius+" m:");

		var list=$("#result_info_list").empty();


		$.each(data,function(index,value){
			 $('<li/>')
	        .html("<span>Class:"+value[0]+", floor:"+value[2]+", ceiling:"+value[3]+"</span>")
	        .appendTo(list);
		});

	});
}



/*
desc: 	validate value of latlng
parameters:
		{lat}: latitude
		{lng}: longitude
return value:
		{boolean}: whether the latlng is valid
*/

function validateLat_Lng(lat,lng){
	if(isNaN(lat)||isNaN(lng)){
		return false;
	}
	else if(lat<-90||lat>90||lng<-180||lng>180){
		return false;
	}
	else{
		return true;
	}
}

function validateLatLng(latlng){

	var lat=latlng.lat;
	var lng=latlng.lng;

	if(isNaN(lat)||isNaN(lng)){
		return false;
	}
	else if(lat<-90||lat>90||lng<-180||lng>180){
		return false;
	}
	else{
		return true;
	}
}

function onMapDrawPoint_orange(e){
	var lat=e.latlng.lat;
	var lng=e.latlng.lng;

	marker=add_Point_Orange(lat, lng, map);
}

function onMapDrawPoint_red(e){
	var lat=e.latlng.lat;
	var lng=e.latlng.lng;

	//marker=add_Point_Red(lat, lng, map);
	var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent('<p>Dangerous!<br />This is controlled airspace. No flight allowed!</p>')
    .openOn(map);

}

function onMapDrawPoint_green(e){
	var lat=e.latlng.lat;
	var lng=e.latlng.lng;

	marker=add_Point_Green(lat, lng, map);
}

function onMapIdentify(e){
	identifyLatlng=e.latlng;
	var url = getFeatureInfoUrl(e.latlng);
	    //showResults = L.Util.bind(this.showGetFeatureInfo, this);

	// $.ajax({
	// 	url:"http://airmarket.gistemp.com/geoserver/airmarket/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=airmarket:airspace_B&outputFormat=text%2Fjavascript&format_options=callback:handleJson_b",
	// 	dataType:'jsonp',
	// 	jsonpCallback:'getJson',
	// 	success:parseResponse
	// });
	$.ajax({
	  url: url,
	  dataType:'jsonp',
	  jsonpCallback:'getJson',
	  success: function (data, status, xhr) {
	    //var err = typeof data === 'string' ? null : data;
	    //showGetFeatureInfo(err, latlng, data);
	  },
	  error: function (xhr, status, error) {
	    //showGetFeatureInfo(error);  
	  }
	});
} 

function parseIdentify(data) {
    // L.geoJson(data, {
    //     onEachFeature: onEachFeature,
    //     pointToLayer: function (feature, latlng) {
    //         return L.circleMarker(latlng, geojsonMarkerOptions);
    //         //return L.marker(latlng);
    //     }
    // }).addTo(map);
	

	//airspace_data=data;
	//airspace_b.addData(airspace_data);

	//load accordingly
	console.log(data);
	showGetFeatureInfo(identifyLatlng, data);
	//L.geoJson(airspace_data).addTo(map);
}


function getFeatureInfoUrl(latlng) {
	// Construct a GetFeatureInfo request URL given a point
	var point = map.latLngToContainerPoint(latlng, map.getZoom()),
	    size = map.getSize(),
	    
	    params = {
	      request: 'GetFeatureInfo',
	      service: 'WMS',
	      srs: 'EPSG:4326',
	      version:'1.1.1',    
	      format: 'image/png',
	      bbox: map.getBounds().toBBoxString(),
	      height: size.y,
	      width: size.x,
	      x:point.x,
	      y:point.y,
	      format:'JSONP',
	      layers: 'airmarket:airport_point',
	      query_layers: 'airmarket:airport_point',
	      info_format: 'text/javascript',
	      outputFormat:'text/javascript',
	      format_options:'callback:parseIdentify'
	    };

	return "http://airmarket.gistemp.com/geoserver/airmarket/wms"+ L.Util.getParamString(params);
}

function showGetFeatureInfo(latlng, content) {
	//if (err) { console.log(err); return; } // do nothing if there's an error

	// Otherwise show the content in a popup, or something.
	L.popup({ maxWidth: 800})
	  .setLatLng(latlng)
	  .setContent(content.features[0].properties.aerodrome)
	  .openOn(map);
}

function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}