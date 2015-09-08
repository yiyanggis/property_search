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

$connection_string="host=".DB_HOST." port=".DB_PORT." dbname=".DB_NAME_Airbnb." user=".DB_USER." password=".DB_PASSWORD;
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
$form_url="http://www.vrbo.com/api/vacation-rentals?brand=vrbo&location=usa%2Fcalifornia%2Forange-county%2Fnewport-beach&datesFirm=1&currency=USD";

// This is the data to POST to the form. The KEY of the array is the name of the field. The value is the value posted.
$data_to_post = array();
$data_to_post['username'] = 'Mickey';
$data_to_post['password'] = 'Minnie';


for ($iter = 1; $iter < 54; $iter++) {
  $form_url="https://www.airbnb.com/s/Pacific-Grove--CA--United-States?guests=&room_types%5B%5D=Entire+home%2Fapt&page=".$iter;

  $curl = curl_init();

  // Set the options
  curl_setopt($curl,CURLOPT_URL, $form_url);

  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  //execute the post
  $result = curl_exec($curl);

  echo "finish curl request\n";


  echo "<br/><hr/>";

  $doc = new DOMDocument();
  $doc->loadHTML($result);

  curl_close($curl);

  $finder = new DomXPath($doc);
  $classname="listing";
  $nodes = $finder->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $classname ')]");

  foreach($nodes as $item){

  $lat;
  $lng;
  $id;

  foreach($item->attributes as $i){
    if($i->name=="data-lat"){
      echo $i->value;
      $lat=$i->value;
    }
    if($i->name=="data-lng"){
      echo $i->value;
      $lng=$i->value;
    }
    if($i->name=="data-id"){
      echo $i->value;
      $id=$i->value;
    }
    //print_r($i);
    //print_r($i);

  }

  $sql="insert into ".$tablename." (ID, lat, lon) values (".$id.", ".$lat.",".$lng.")";

  $ret = pg_query($db_conn, $sql);
  if(!$ret){
    echo pg_last_error($db_conn);
  } else {
    echo "Records created successfully\n";
  }
    echo "<br/><hr/>";
  }

}

?>