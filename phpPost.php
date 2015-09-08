<?php

// $servername = "localhost";
// $username = "root";
// $password = "password";
// $dbname="property";
// //$tablename="carlsbad2";
// //$tablename="Huntington_Beach";
// //$tablename="south_laguna";
// $tablename="newport_beach";

require('config.php');

$connection_string="host=".DB_HOST." port=".DB_PORT." dbname=".DB_NAME." user=".DB_USER." password=".DB_PASSWORD;
$db_conn=pg_connect($connection_string) or die ("Could not connect to server\n");

$arguments;
if ( !isset($_SERVER['HTTP_USER_AGENT']) ) {
   $arguments = $argv;
} else {
   $arguments = array();
   $arguments[] = $_SERVER['SCRIPT_FILENAME'];
   foreach ($_GET as $key => $value){
      $arguments[] = $value;
   }
}

var_dump($arguments);

$tablename=str_replace(" ","_",$arguments[1]);
$tablename=str_replace("-","_",$tablename);


// Define URL where the form resides
//$form_url = "http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fsan-diego-county%2Fcarlsbad&datesFirm=1&currency=USD";
$form_url="http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fcentral-coast%2Fpacific-grove&datesFirm=1&currency=USD";

// This is the data to POST to the form. The KEY of the array is the name of the field. The value is the value posted.
$data_to_post = array();
$data_to_post['username'] = 'Mickey';
$data_to_post['password'] = 'Minnie';

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

//echo $result->listings;

$result_records=json_decode($result);

$totalNum=$result_records->hitCount;

// foreach ($result_records->listings as &$value) {
//     print_r($value);
//     echo "<br/>";
    
//     $sql="insert into ".$tablename." (ID, lat, lon) values (".$value->unitId.", ".$value->latitude.",".$value->longitude.")";

//    $ret = pg_query($db_conn, $sql);
//    if(!$ret){
//       echo pg_last_error($db_conn);
//    } else {
//       echo "Records created successfully\n";
//    }
// }



// echo sizeof($result_records->listings);
//print_r(array_values($result_records->listings));



//close the connection
curl_close($curl);

for ($i = 1; $i*50 <= $totalNum+50; $i++) {
    $form_url2="http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fcentral-coast%2Fpacific-grove&datesFirm=1&currency=USD&pagingInfo=".$i;

    $curl = curl_init();
    curl_setopt($curl,CURLOPT_URL, $form_url2);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($curl);

    $result_records=json_decode($result);

    foreach ($result_records->listings as &$value) {
      print_r($value);
      echo "<br/>";
      
      $sql="insert into ".$tablename." (ID, lat, lon, listnum) values (".$value->unitId.", ".$value->latitude.",".$value->longitude.",'".$value->listingNumber."')";

     $ret = pg_query($db_conn, $sql);
     if(!$ret){
        echo pg_last_error($db_conn);
     } else {
        echo "Records created successfully\n";
     }
  }

  echo sizeof($result_records->listings);

}

/*
$r = new HttpRequest('http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fsan-diego-county%2Fcarlsbad&datesFirm=1&currency=USD', HttpRequest::METH_GET);
//$r->setOptions(array('lastmodified' => filemtime('local.rss')));
//$r->addQueryData(array('category' => 3));
try {
    $r->send();
    if ($r->getResponseCode() == 200) {
        //file_put_contents('local.rss', $r->getResponseBody());
        echo $r->getResponseBody();
    }
} catch (HttpException $ex) {
    echo $ex;
}
*/

/*

$url = 'http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Fsan-diego-county%2Fcarlsbad&datesFirm=1&currency=USD';
$data = array('key1' => 'value1', 'key2' => 'value2');

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => ""//http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

var_dump($result);
*/

?>