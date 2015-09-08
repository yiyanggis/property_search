<?php

$servername = "localhost";
$username = "root";
$password = "password";
$dbname="property";
//$tablename="carlsbad2";
$tablename="Huntington_Beach";

$connection_string="host=localhost port=5432 dbname=property user=postgres password=postgres";
$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");


// Define URL where the form resides
$form_url = "http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fsan-diego-county%2Fcarlsbad&datesFirm=1&currency=USD";
//$form_url="https://www.airbnb.com/s/Carlsbad--California--United-States?guests=&room_types%5B%5D=Entire+home%2Fapt&page=1";
$form_url="https://www.airbnb.com/s/Carlsbad--California--United-States?guests=&room_types%5B%5D=Entire+home%2Fapt&page=1";
//$form_url="http://www.antennasearch.com/sitestart.asp?sourcepagename=antennachecktxreview&getpagename=pgtxdetail&cmdrequest=getpage&ipos=180&isubpos=1&strtxtype=lmpriv&unique_system_identifier=3109716&location_number=1";

// This is the data to POST to the form. The KEY of the array is the name of the field. The value is the value posted.

// Initialize cURL
$curl = curl_init();

// Set the options
curl_setopt($curl,CURLOPT_URL, $form_url);

// This sets the number of fields to post
//curl_setopt($curl,CURLOPT_GET, sizeof($data_to_post));

// This is the fields to post in the form of an array.
//curl_setopt($curl,CURLOPT_POSTFIELDS, $data_to_post);

// curl_setopt($curl, CURLOPT_HTTPHEADER, array('Expect:'));

//curl_setopt($curl, CURLOPT_HTTPGET, true);

curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// curl_setopt($curl,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');

// curl_setopt($curl, CURLOPT_AUTOREFERER, true);

// curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);

// curl_setopt($curl, CURLOPT_VERBOSE, 1);

//execute the post
$result = curl_exec($curl);

echo "finish curl request\n";

//print_r($result);

echo "<br/><hr/>";

//echo gettype($result)."\n";



//$xml=simplexml_load_string($result) or die("Error: Cannot create object");

$doc = new DOMDocument();
$doc->loadHTML($result);

//print_r($doc);

// foreach($doc->childNodes as $item){
//   echo $item->nodeValue;
// }


curl_close($curl);

$finder = new DomXPath($doc);
$classname="listing";
$nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

foreach($nodes as $item){
	
	foreach($item->attributes as $i){
		if($i->name=="data-lat"){
			echo $i->value;
		}
		if($i->name=="data-lng"){
			echo $i->value;
		}
		if($i->name=="data-id"){
			echo $i->value;
		}
		print_r($i);
	  //print_r($i);
	  
	}
	echo "<br/><hr/>";
}

?>