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
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

	// var air_port=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	//     layers: 'airport_merge',
	//     format: 'image/png',
	//     transparent: true
	// } );

	var air_port_was=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airport_was',
	    format: 'image/png',
	    transparent: true
	} );

	var air_port_cfs_land=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airport_CFSland',
	    format: 'image/png',
	    transparent: true
	} );

	var air_port_cfs_heli=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airport_CFSheli',
	    format: 'image/png',
	    transparent: true
	} );

	var airspace_b=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airspace_b',
	    format: 'image/png',
	    transparent: true
	} );

	var airspace_c=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airspace_c',
	    format: 'image/png',
	    transparent: true
	} );

	var airspace_d=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airspace_d',
	    format: 'image/png',
	    transparent: true
	} );

	var airspace_e=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airspace_e',
	    format: 'image/png',
	    transparent: true
	} );

	var airspace_f=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'airspace_f',
	    format: 'image/png',
	    transparent: true
	} );

	var road=L.tileLayer.wms( "http://airmarket.gistemp.com/geoserver/airmarket/wms", {
	    layers: 'primary_road',
	    format: 'image/png',
	    transparent: true
	} );


    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

    var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

	var map = L.map(mapdiv, {
		center: [45, -79],
		zoom: 10,
		layers: [streets,road]
	});

	var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets,
		"osm":osm
	};

	var overlays = {
		//"Cities": cities,
		"airport_was":air_port_was,
		"airport_land":air_port_cfs_land,
		"airport_heli":air_port_cfs_heli,
		"airspace Class B":airspace_b,
		"airspace Class C":airspace_c,
		"airspace Class D":airspace_d,
		"airspace Class E":airspace_e,
		"airspace Class F":airspace_f,

		"road":road
	};

	L.control.layers(baseLayers, overlays).addTo(map);


	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	// Set the title to show on the polygon button
	L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

	var drawControl = new L.Control.Draw({
		position: 'topright',
		draw: {
			polyline: {
				metric: true
			},
			polygon: {
				allowIntersection: false,
				showArea: true,
				drawError: {
					color: '#0000FF',
					timeout: 1000
				},
				shapeOptions: {
					color: '#0000FF'
				}
			},
			circle: {
				shapeOptions: {
					color: '#662d91'
				}
			},
			marker: {
				icon: new L.Icon.Default()
			}
		},
		edit: {
			featureGroup: drawnItems,
			remove: false
		}
	});
	map.addControl(drawControl);

	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;

		if (type === 'marker') {
			layer.bindPopup('A mession spot!');
			//query
			var results=query(layer._latlng, map);

		}

		drawnItems.addLayer(layer);
	});

	map.on('draw:edited', function (e) {
		var layers = e.layers;
		var countOfEditedLayers = 0;
		layers.eachLayer(function(layer) {
			countOfEditedLayers++;
		});
		console.log("Edited " + countOfEditedLayers + " layers");
	});

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


/*
desc: 	user add point public function
parameters:
		{lat}: latitude
		{lng}: longitude
		{map}: map variable
return value:
		{L.Marker}:marker variable
*/
function add_Point(lat, lng, map){
	//validate latlng
	if(validateLatLng(lat,lng)){
		var marker=L.marker([lat,lng])
			.bindPopup(lat+", "+lng);
		marker.addTo(map);

		return marker;
	}
	else{
		return null;
	}
}

/*
desc: 	validate value of latlng
parameters:
		{lat}: latitude
		{lng}: longitude
return value:
		{boolean}: whether the latlng is valid
*/

function validateLatLng(lat,lng){
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