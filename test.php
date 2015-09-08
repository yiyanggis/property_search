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
//$form_url = "http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fsan-diego-county%2Fcarlsbad&datesFirm=1&currency=USD";
$form_url="http://www.vrbo.com/7095837ha";

// This is the data to POST to the form. The KEY of the array is the name of the field. The value is the value posted.

// Initialize cURL
$curl = curl_init();

// Set the options
curl_setopt($curl,CURLOPT_URL, $form_url);

// This sets the number of fields to post
//curl_setopt($curl,CURLOPT_GET, sizeof($data_to_post));

// This is the fields to post in the form of an array.
//curl_setopt($curl,CURLOPT_POSTFIELDS, $data_to_post);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

//execute the post
$result = curl_exec($curl);

echo "finish curl request\n";

echo gettype($result)."\n";

//$xml=simplexml_load_string($result) or die("Error: Cannot create object");
 $array2=0;

$doc = new DOMDocument();
$doc->loadHTML($result);

// foreach($doc->childNodes as $item){
//   echo $item->nodeValue;
// }
//print_r($doc);

//$tds=$doc->getElementById('media-calendar');

$tds=$doc->getElementsByTagName('script');

$xpath = new DOMXpath($doc);

$calendar=$xpath->query("//*[contains(@class, 'cal-months')]")->item(1);

//echo $doc->saveHTML($tds);

// print_r($calendar);

//$array2 = substr_count($tds->item(9)->nodeValue,"N");
  foreach($tds as $item){
    echo $item->nodeValue;
    $temp = substr_count($item->nodeValue,"N");
    if($temp>$array2)
      $array2=$temp;
  }

//echo substr_count($tds->item(9)->nodeValue,"N");
  echo $array2;

$articles = $xpath->query("//td[contains(@class, 'calmonth-from-res')]");

//print_r($articles->item(1));

// $widget=$doc->getElementById("listing-criteria");

// //print_r($widget);

// $list=$widget->childNodes->item(1);

// //print_r($list);


// foreach ($list->childNodes as $item) {
//     if ($item->hasChildNodes()) {
//         $childs = $item->childNodes;
//         foreach($childs as $i) {
//             //echo $i->nodeValue . "<br />";
//             if($i->nodeValue=="House"){
//               echo $i->nodeValue . "<br />";
//             }
//             else if($i->nodeValue=="Apartment"){
//               echo $i->nodeValue . "<br />";
//             }
//             else if($i->nodeValue=="Cottage"){
//               echo $i->nodeValue . "<br />";
//             }
//         }
//     }
// }

//$property=$list->childNodes->item(5);
//echo $property->nodeValue;
//print_r($property);


//$property_type=$property->childNodes->item(2);

//print_r($property_type);
//close the connection
curl_close($curl);


?>